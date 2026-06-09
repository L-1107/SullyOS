import React, { useEffect, useMemo, useRef, useState } from 'react';

// 角色切换「登场」过场 —— 不是换页/换 tab，而是「离开一个人，走进另一个人的空间」。
// 设计：以「即将见到的这个人」的头像虚化铺底，作为 ta 的「色彩世界」，
// 中心头像带柔光浮现 + 名字优雅升起 → 再推进穿过，进入聊天。
// 每个角色都被自己头像的颜色/气质染色，天然有「去见某个人」的情绪，与开机「世界入场」同一套语言。
// 全程仅 transform/opacity；可轻触跳过；尊重 prefers-reduced-motion；内联 @keyframes（CDN Tailwind 不可靠生成自定义 animate-*）。

interface Props {
  name: string;
  avatar?: string;
  /** 过场播完（或被跳过）后回调，由父组件卸载本层。 */
  onDone: () => void;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CharacterEntryTransition: React.FC<Props> = ({ name, avatar, onDone }) => {
  const reduced = useMemo(prefersReducedMotion, []);
  const REVEAL_AT = reduced ? 200 : 660; // 开始「推进穿过」退场的时刻
  const TOTAL = reduced ? 380 : 940;     // 总时长（落在 500–1200ms 区间）
  const REVEAL = TOTAL - REVEAL_AT;

  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);
  const finish = () => { if (!doneRef.current) { doneRef.current = true; onDone(); } };

  useEffect(() => {
    const tExit = setTimeout(() => setExiting(true), REVEAL_AT);
    const tDone = setTimeout(finish, TOTAL);
    return () => { clearTimeout(tExit); clearTimeout(tDone); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 轻触跳过：立刻进入退场（仍是平滑推进，不是硬切）
  const skip = () => { setExiting(true); window.setTimeout(finish, 160); };

  const avatarBg = avatar ? `url(${avatar})` : '';

  return (
    <div
      onClick={skip}
      aria-hidden
      className="absolute inset-0 z-[140] overflow-hidden flex items-center justify-center cursor-pointer"
      style={{ opacity: exiting ? 0 : 1, transition: `opacity ${REVEAL}ms ease-in` }}
    >
      <style>{`
        @keyframes charVeilIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes charBgSettle { from { transform: scale(1.14) } to { transform: scale(1.04) } }
        @keyframes charAvatarIn { 0% { opacity:0; transform: translateY(14px) scale(.82); filter: blur(9px) } 60% { opacity:1 } 100% { opacity:1; transform: translateY(0) scale(1); filter: blur(0) } }
        @keyframes charGlowIn { 0% { opacity:0; transform: translate(-50%,-50%) scale(.6) } 45% { opacity:.85 } 100% { opacity:.6; transform: translate(-50%,-50%) scale(1) } }
        @keyframes charNameIn { from { opacity:0; transform: translateY(12px) } to { opacity:1; transform: translateY(0) } }
        @keyframes charLineIn { from { opacity:0; transform: scaleX(0) } to { opacity:.7; transform: scaleX(1) } }
      `}</style>

      {/* 推进层：退场时整体放大并随根层淡出 = 相机穿过、走进 ta 的空间 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: exiting ? 'scale(1.12)' : undefined,
          transition: exiting ? `transform ${REVEAL}ms cubic-bezier(0.4,0,0.2,1)` : undefined,
          willChange: 'transform',
        }}
      >
        {/* 氛围底：虚化头像 = ta 的色彩世界（无头像时回退主题色光场） */}
        {avatarBg ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{
            background: avatarBg, backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'blur(26px)', transform: 'scale(1.14)',
            animation: reduced ? 'charVeilIn 240ms ease-out both' : 'charBgSettle 940ms cubic-bezier(0.22,1,0.36,1) both, charVeilIn 320ms ease-out both',
          }} />
        ) : (
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(120% 100% at 50% 40%, hsla(var(--primary-hue),55%,40%,0.9), #0c0b1e 70%)',
            animation: 'charVeilIn 320ms ease-out both',
          }} />
        )}
        {/* 压暗 + 暗角：让中心头像与名字清晰浮出 */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(115% 95% at 50% 42%, rgba(8,8,18,0.35) 30%, rgba(6,6,16,0.78) 100%)' }} />

        {/* 中心：头像登场 + 柔光晕 + 名字 */}
        <div className="relative flex flex-col items-center px-8">
          <div className="relative" style={{ width: 132, height: 132 }}>
            {/* 柔光晕（在头像后绽放） */}
            <div className="absolute" style={{
              left: '50%', top: '50%', width: 230, height: 230, transform: 'translate(-50%,-50%)',
              borderRadius: '9999px', filter: 'blur(8px)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, hsla(var(--primary-hue),80%,80%,0.32) 40%, transparent 66%)',
              animation: reduced ? 'charVeilIn 260ms ease-out both' : 'charGlowIn 760ms cubic-bezier(0.22,1,0.36,1) 120ms both',
            }} />
            {/* 头像 */}
            <div
              className="absolute inset-0 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: avatarBg || undefined,
                backgroundColor: avatarBg ? undefined : 'hsla(var(--primary-hue),50%,55%,0.6)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(255,255,255,0.5), 0 0 28px hsla(var(--primary-hue),80%,80%,0.45)',
                animation: reduced ? 'charAvatarIn 320ms ease-out both' : 'charAvatarIn 720ms cubic-bezier(0.22,1,0.36,1) 100ms both',
              }}
            />
          </div>
          <div
            className="mt-5 text-white text-2xl font-medium tracking-wide"
            style={{
              textShadow: '0 2px 18px rgba(0,0,0,0.5), 0 0 24px hsla(var(--primary-hue),80%,80%,0.3)',
              animation: reduced ? 'charNameIn 320ms ease-out both' : 'charNameIn 640ms cubic-bezier(0.22,1,0.36,1) 360ms both',
            }}
          >
            {name}
          </div>
          <div className="mt-3 h-px w-20" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            transformOrigin: 'center',
            animation: reduced ? 'charVeilIn 300ms ease-out both' : 'charLineIn 700ms ease-out 480ms both',
          }} />
        </div>
      </div>
    </div>
  );
};

export default CharacterEntryTransition;
