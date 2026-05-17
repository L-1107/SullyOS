import React from 'react';

/**
 * 构建版本指示器：右下角显示 `branch@shortHash`。
 * - 仅当 vite.config 注入的 __BUILD_BADGE_VISIBLE__ 为 true 时挂载
 *   （VITE_HIDE_BUILD_BADGE=1 时构建会把它编译成 false → 树摇掉）
 * - pointer-events-none + select-none：不可点、不可选、不影响下层交互
 * - z-[2147483647]：保证盖在所有 modal / 动画 / 全屏覆盖层之上
 * - safe-area-inset：iOS PWA 底部 home indicator 区域避让
 */
const BuildBadge: React.FC = () => {
    if (!__BUILD_BADGE_VISIBLE__) return null;

    const label = `${__BUILD_BRANCH__}@${__BUILD_COMMIT__}`;

    return (
        <div
            aria-hidden
            className="fixed pointer-events-none select-none"
            style={{
                bottom: 'calc(env(safe-area-inset-bottom, 0px) + 4px)',
                right: 'calc(env(safe-area-inset-right, 0px) + 6px)',
                zIndex: 2147483647,
                touchAction: 'none',
            }}
        >
            <span
                className="px-1.5 py-[2px] rounded-md text-[9px] font-mono tracking-wider text-white/45 bg-black/35 backdrop-blur-sm shadow-sm"
                style={{ letterSpacing: '0.05em' }}
            >
                {label}
            </span>
        </div>
    );
};

export default BuildBadge;
