/**
 * 查询当前激活 Service Worker 的版本号。
 *
 * 通过 MessageChannel + postMessage 的 GET_SW_VERSION 协议向 SW 询问，
 * SW 在 worker/sw-keep-alive.ts 里用 event.ports[0].postMessage({ version }) 回包。
 * SW 未注册 / 不响应（1.5s 超时）时返回 '?'。
 *
 * BuildBadge（右下角开发指示器）与 Settings 底部的版本信息都复用这个函数。
 */
export async function querySwVersion(): Promise<string> {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return '?';
    try {
        const reg = await navigator.serviceWorker.ready;
        const target = reg.active || reg.waiting || reg.installing;
        if (!target) return '?';
        return await new Promise<string>((resolve) => {
            const channel = new MessageChannel();
            const timer = setTimeout(() => resolve('?'), 1500);
            channel.port1.onmessage = (e) => {
                clearTimeout(timer);
                resolve(e.data?.version ?? '?');
            };
            target.postMessage({ type: 'GET_SW_VERSION' }, [channel.port2]);
        });
    } catch {
        return '?';
    }
}
