import React from 'react';

// 聊天「白框」自定义 CSS 编辑器（Appearance 全局默认 与 单角色定制 共用）。
// 选择器钩子见 ChatHeaderShell / ChatInputArea / Chat 根：.sully-chat-header / -back / -avatar /
// -name / -status / -buffs / -token / -trigger / -inputbar / -root。

export const CHROME_CSS_FULL_PRESETS: { name: string; code: string }[] = [
    { name: '彩虹波浪', code: `.sully-chat-header{
  position:relative;
  background:repeating-linear-gradient(90deg,#ffd6ea 0 40px,#ffe8a3 40px 80px,#d7f5c5 80px 120px,#cfe7ff 120px 160px,#e6d2ff 160px 200px)!important;
  border-bottom:none!important;
  box-shadow:0 4px 12px rgba(0,0,0,.08),inset 0 -4px rgba(255,255,255,.4);
  overflow:visible;
}
.sully-chat-header::after{content:"";position:absolute;left:0;right:0;bottom:-12px;height:24px;background:radial-gradient(circle at 12px 0,transparent 12px,rgba(255,255,255,.9) 13px);background-size:24px 24px;background-repeat:repeat-x;}
.sully-chat-header::before{content:"";position:absolute;left:0;right:0;top:0;height:6px;background:repeating-linear-gradient(90deg,#c18b5b 0 20px,#b67d4f 20px 40px);}` },
    { name: '霓虹夜', code: `.sully-chat-header{
  background:#0e0b1e!important;
  border-bottom:1px solid rgba(168,85,247,.45)!important;
  box-shadow:0 0 26px rgba(168,85,247,.35);
}
.sully-chat-name{color:#e9d5ff!important;text-shadow:0 0 8px rgba(192,132,252,.9);}
.sully-chat-status{color:#a78bfa!important;}
.sully-chat-trigger,.sully-chat-back{color:#67e8f9!important;}` },
    { name: '奶油渐变', code: `.sully-chat-header{
  background:linear-gradient(135deg,#fff1f6,#fde7c9 55%,#e7f0ff)!important;
  border-bottom:none!important;
  box-shadow:0 6px 18px rgba(180,150,120,.14);
  border-bottom-left-radius:20px;border-bottom-right-radius:20px;
}` },
    { name: '像素窗口', code: `.sully-chat-header{
  position:relative;
  background:#dfe7ef!important;
  border:none!important;border-bottom:2px solid #8aa0b6!important;
  box-shadow:inset 0 2px #fff,inset 0 -2px #b7c4d2;
}
.sully-chat-header::before{content:"● ● ●";position:absolute;left:14px;top:calc(var(--safe-top) + 6px);letter-spacing:4px;color:#ff6b6b;font-size:9px;}` },
];

export const CHROME_CSS_SNIPPETS: { name: string; code: string }[] = [
    { name: '头部贴图', code: '.sully-chat-header{background:url(在此粘贴图片直链) center/cover!important;border-bottom:none!important;}' },
    { name: '头像放大', code: '.sully-chat-avatar{width:52px!important;height:52px!important;}' },
    { name: '隐藏情绪栏', code: '.sully-chat-buffs{display:none!important;}' },
    { name: '隐藏token', code: '.sully-chat-token{display:none!important;}' },
    { name: '隐藏小闪电', code: '.sully-chat-trigger{display:none!important;}' },
    { name: '闪电描金', code: '.sully-chat-trigger{color:#d4af37!important;filter:drop-shadow(0 0 4px rgba(212,175,55,.6));}' },
    { name: '输入栏毛玻璃', code: '.sully-chat-inputbar{background:rgba(255,255,255,.45)!important;backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);}' },
];

const Hint: React.FC = () => (
    <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
        直接写 CSS，自定义整块顶栏与白框——换色 / 贴图 / 圆角 / 不规则外形（clip-path）/ 挪位 / 显隐。
        可用选择器：<code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-header</code> 顶栏、
        <code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-back</code> 返回、
        <code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-avatar</code> 头像、
        <code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-name</code> 名字、
        <code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-status</code> 状态、
        <code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-buffs</code> 情绪栏、
        <code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-token</code> token、
        <code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-trigger</code> 小闪电、
        <code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-inputbar</code> 输入栏、
        <code className="mx-0.5 rounded bg-slate-100 px-1 text-slate-500">.sully-chat-root</code> 整屏。
        挪位用 <code className="rounded bg-slate-100 px-1 text-slate-500">position:absolute</code>（顶栏已 relative）；覆盖默认样式记得加 <code className="rounded bg-slate-100 px-1 text-slate-500">!important</code>。
    </p>
);

const ChromeCssEditor: React.FC<{ value: string; onChange: (css: string) => void }> = ({ value, onChange }) => {
    const append = (code: string, sep: string) => onChange((value ? value.trimEnd() + sep : '') + code);
    return (
        <div>
            <Hint />
            <div className="mb-1.5 mt-3 text-[9px] font-bold uppercase tracking-wider text-slate-400">完整风格（换风格建议先清空）</div>
            <div className="mb-3 flex flex-wrap gap-1.5">
                {CHROME_CSS_FULL_PRESETS.map((p) => (
                    <button key={p.name} onClick={() => append(p.code, '\n\n')}
                        className="rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[11px] font-bold text-primary transition-all hover:bg-primary/15 active:scale-95">
                        {p.name}
                    </button>
                ))}
            </div>
            <div className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">可叠加片段</div>
            <div className="mb-3 flex flex-wrap gap-1.5">
                {CHROME_CSS_SNIPPETS.map((p) => (
                    <button key={p.name} onClick={() => append(p.code, '\n')}
                        className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 transition-all hover:bg-slate-200 active:scale-95">
                        + {p.name}
                    </button>
                ))}
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={'/* 例如 */\n.sully-chat-header{\n  background: linear-gradient(135deg,#ffd9ec,#d9c7ff) !important;\n  border-bottom: none !important;\n}'}
                spellCheck={false}
                rows={6}
                className="w-full resize-y rounded-2xl border border-slate-700 bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-200 outline-none focus:border-primary/50 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            />
            {value && (
                <button onClick={() => onChange('')} className="mt-2 text-[11px] font-semibold text-rose-400 hover:text-rose-500">
                    清空自定义 CSS
                </button>
            )}
        </div>
    );
};

export default ChromeCssEditor;
