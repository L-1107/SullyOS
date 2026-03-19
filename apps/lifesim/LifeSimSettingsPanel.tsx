import React from 'react';
import { CharacterProfile } from '../../types';
import { CheckSquare, Gear, Square, X } from '@phosphor-icons/react';

const LifeSimSettingsPanel: React.FC<{
    characters: CharacterProfile[];
    selectedCharIds: string[];
    onToggleChar: (charId: string) => void;
    onSelectAll: () => void;
    onSelectNone: () => void;
    onClose: () => void;
}> = ({ characters, selectedCharIds, onToggleChar, onSelectAll, onSelectNone, onClose }) => {
    return (
        <div
            className="absolute inset-0 z-40 flex items-end justify-center"
            style={{ background: 'rgba(0,0,0,0.3)' }}
            onClick={event => { if (event.target === event.currentTarget) onClose(); }}
        >
            <div
                className="retro-window w-full mx-2 mb-2"
                style={{
                    maxHeight: '74vh',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.5)',
                }}
            >
                <div className="retro-titlebar">
                    <span className="flex items-center gap-1">
                        <Gear size={11} weight="bold" /> char-settings.ini
                    </span>
                    <button
                        onClick={onClose}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 18,
                            height: 18,
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            color: 'white',
                        }}
                    >
                        <X size={10} weight="bold" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1" style={{ padding: 10 }}>
                    <div className="retro-inset" style={{ padding: '6px 8px', marginBottom: 8 }}>
                        <p style={{ fontSize: 10, color: '#6a6181', lineHeight: 1.6 }}>
                            这里决定哪些外部角色会参与这局《都市人生》的搅局、围观和城市结算卡发送。
                        </p>
                    </div>

                    <div className="flex gap-2 mb-2">
                        <button onClick={onSelectAll} className="retro-btn" style={{ padding: '4px 10px', fontSize: 10 }}>
                            全选
                        </button>
                        <button onClick={onSelectNone} className="retro-btn" style={{ padding: '4px 10px', fontSize: 10 }}>
                            清空
                        </button>
                    </div>

                    <div className="space-y-1.5">
                        {characters.map(char => {
                            const active = selectedCharIds.includes(char.id);
                            return (
                                <button
                                    key={char.id}
                                    onClick={() => onToggleChar(char.id)}
                                    className="w-full text-left"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        padding: 8,
                                        borderRadius: 6,
                                        border: active ? '2px solid rgba(91,143,168,0.55)' : '2px solid rgba(0,0,0,0.08)',
                                        background: active ? 'rgba(123,173,196,0.12)' : 'rgba(255,255,255,0.55)',
                                    }}
                                >
                                    <img src={char.avatar} alt={char.name} style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: '#504a61' }}>{char.name}</div>
                                        <div style={{ fontSize: 9, color: '#8b8499', lineHeight: 1.5 }}>
                                            {char.description || '暂无描述'}
                                        </div>
                                    </div>
                                    <div style={{ color: active ? '#5b8fa8' : '#a7a0b6' }}>
                                        {active ? <CheckSquare size={16} weight="fill" /> : <Square size={16} weight="bold" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ padding: '6px 10px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                    <button onClick={onClose} className="retro-btn w-full" style={{ padding: '6px 12px' }}>
                        完成
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LifeSimSettingsPanel;
