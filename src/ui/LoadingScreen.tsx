import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import { useGameStore } from "../core/store/gameStore";
import gsap from "gsap";

// --- Sub Components ---
const Key = ({ children }: { children: React.ReactNode }) => (
    <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        minWidth: '18px', height: '22px', padding: '0 5px', margin: '0 4px',
        border: '1px solid #555', borderRadius: '4px', background: 'rgba(255,255,255,0.05)',
        fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 'bold', color: '#ccc',
        lineHeight: 1, verticalAlign: 'middle', boxSizing: 'border-box'
    }}>
        {children}
    </span>
);

const MouseIcon = () => (
    <span style={{
        display: 'inline-block', position: 'relative', width: '12px', height: '18px', margin: '0 4px',
        border: '1.5px solid #ccc', borderRadius: '6px', verticalAlign: 'middle', opacity: 0.8
    }}>
        <span style={{
            position: 'absolute', top: '3px', left: '50%', transform: 'translateX(-50%)',
            width: '1.5px', height: '4px', background: '#ccc', borderRadius: '1px'
        }} />
    </span>
);

const InstructionRow = ({ input, label }: { input: React.ReactNode, label: string }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {input}
        <span style={{ marginLeft: '6px', fontSize: '0.7rem', letterSpacing: '1px', fontWeight: 500, transform: 'translateY(1px)' }}>
            {label}
        </span>
    </div>
);

// --- Main Component ---

export function LoadingScreen() {
    // Store & Hooks
    const { active, progress: downloadProgress } = useProgress();
    const activeTargets = useGameStore((state) => state.activeTargets);
    const readyStatus = useGameStore((state) => state.readyStatus);
    const isMobile = useGameStore((state) => state.isMobile);
    const setIsGameStarted = useGameStore((state) => state.setIsGameStarted);
    const gpuError = useGameStore((state) => state.gpuError);

    // Local State
    const [isReadyToStart, setIsReadyToStart] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isLandscape, setIsLandscape] = useState(false); // New State for Landscape detection

    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    // Orientation detection hook
    useEffect(() => {
        const checkOrientation = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    const total = activeTargets.length;
    const loaded = activeTargets.filter((id) => readyStatus[id]).length;
    const compileProgress = total === 0 ? 0 : (loaded / total) * 100;

    const displayProgress = useMemo(() => {
        if (active) return Math.round(downloadProgress * 0.5);
        return Math.min(Math.round(50 + compileProgress * 0.5), 99);
    }, [active, downloadProgress, compileProgress]);

    useEffect(() => {
        if (!active && loaded === total && total > 0) {
            const t = setTimeout(() => setIsReadyToStart(true), 200);
            return () => clearTimeout(t);
        }
    }, [active, loaded, total]);

    const handleStart = () => {
        if (!isReadyToStart || gpuError) return;
        setIsGameStarted(true);
        if (containerRef.current) {
            animationRef.current = gsap.to(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => setIsVisible(false)
            });
        }
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) animationRef.current.kill();
        };
    }, []);

    if (!isVisible) return null;

    // --- Dynamic Styles ---
    const isMobileLandscape = isMobile && isLandscape;

    const containerStyle: React.CSSProperties = {
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100dvh',
        background: '#000', zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontFamily: 'Cousine',
        pointerEvents: 'auto',
        fontSize: isMobile ? '0.8rem' : '0.9rem',
        opacity: 0.99,
        // In landscape, we want strict overflow handling
        overflow: 'hidden',
        padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
    };

    const entryContainerStyle: React.CSSProperties = {
        opacity: 1,
        maxWidth: isMobileLandscape ? '88%' : (isMobile ? '100%' : '920px'),
        padding: isMobileLandscape ? '20px' : '44px',
        animation: 'fadeIn 2s ease',
        display: 'flex',
        // SWITCH LAYOUT: Row for landscape, Column for portrait
        flexDirection: isMobileLandscape ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobileLandscape ? '40px' : '0px',
        height: isMobileLandscape ? '100%' : 'auto'
    };

    const playButtonStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '18px' : '22px',
        padding: 0,
        color: gpuError ? 'rgba(245, 248, 255, 0.58)' : (isReadyToStart ? '#ffffff' : 'rgba(220, 226, 232, 0.72)'),
        background: 'none',
        border: 'none',
        outline: 'none',
        borderRadius: 0,
        fontSize: '13px',
        letterSpacing: isReadyToStart ? '0.24em' : '3px',
        fontWeight: isReadyToStart ? 600 : 500,
        transition: 'opacity 240ms ease, color 240ms ease',
        cursor: gpuError ? 'default' : (isReadyToStart ? 'pointer' : 'wait'),
        opacity: gpuError ? 0.8 : 1,
        whiteSpace: 'nowrap',
        animation: 'none',
        boxShadow: 'none',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
    };

    return (
        <div ref={containerRef} style={containerStyle}>
            <div className='entry' style={entryContainerStyle}>

                {/* Left Side: Content Text */}
                <div style={{
                    flex: isMobileLandscape ? '1' : 'auto',
                    textAlign: isMobileLandscape ? 'left' : 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: isMobileLandscape ? 'center' : 'flex-start'
                }}>
                    {/* Title */}
                    <div style={{
                        fontSize: isMobile ? 'clamp(30px, 8vw, 40px)' : 'clamp(30px, 4vw, 48px)',
                        fontWeight: 700,
                        letterSpacing: isMobile ? '0.22em' : '0.27em',
                        lineHeight: 1.08,
                        color: 'rgba(245, 248, 255, 0.96)',
                        textShadow: '0 0 18px rgba(255,255,255,0.12)',
                        marginBottom: isMobileLandscape ? '0.7rem' : '1.25rem',
                    }}>
                        HAN HAO PORTFOLIO
                    </div>

                    {/* Subtitle */}
                    <div style={{
                        fontSize: isMobileLandscape ? 'clamp(12px, 1.2vw, 14px)' : 'clamp(13px, 1.4vw, 18px)',
                        fontWeight: 500,
                        letterSpacing: isMobile ? '0.18em' : '0.28em',
                        color: 'rgba(210, 220, 230, 0.66)',
                        marginBottom: isMobileLandscape ? '1.1rem' : '2.45rem',
                        textTransform: 'uppercase',
                    }}>
                        Product Design Engineer
                    </div>

                    {/* Intro Text */}
                    <div style={{
                        textAlign: isMobileLandscape ? 'left' : 'center',
                        display: 'inline-block',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        lineHeight: 1.75,
                        color: 'rgba(225, 230, 238, 0.82)',
                        letterSpacing: '0.025em',
                        fontWeight: 400,
                        marginBottom: isMobileLandscape ? '0' : '3.45rem',
                        fontSize: isMobileLandscape ? 'clamp(12px, 1vw, 14px)' : 'clamp(15px, 1.25vw, 20px)',
                        maxWidth: '820px',
                    }}>
                        <p style={{ display: 'none' }}>
                            A portfolio journey across AI products, mobility interfaces, digital commerce,
                            and visual systems — shaped by product thinking, interaction design, and design engineering.
                        </p>
                        <p style={{ margin: 0 }}>
                            A portfolio journey across AI products, mobility interfaces, digital commerce,
                            and visual systems {"\u2014"} shaped by product thinking, interaction design, and design engineering.
                        </p>
{/* 
                        {!gpuError && (
                            <p>
                                As you travel forward, the ground begins to change beneath you, leaving visible traces of passage behind.
                            </p>
                        )} */}
                    </div>
                </div>

                {/* Right Side: Interaction Area */}
                <div style={{
                    flex: isMobileLandscape ? '0.8' : 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: isMobileLandscape ? '200px' : 'auto'
                }}>
                    {/* Play Button & Progress Bar */}
                    <div className='play'>
                        <button
                            onClick={handleStart}
                            disabled={!isReadyToStart || !!gpuError}
                            style={playButtonStyle}
                            onMouseEnter={(e) => {
                                if (!isReadyToStart || gpuError) return;
                                e.currentTarget.style.opacity = '0.86';
                                e.currentTarget.querySelectorAll<HTMLElement>('[data-start-line]').forEach((line) => {
                                    line.style.background = 'rgba(255,255,255,0.78)';
                                });
                            }}
                            onMouseLeave={(e) => {
                                if (!isReadyToStart || gpuError) return;
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.querySelectorAll<HTMLElement>('[data-start-line]').forEach((line) => {
                                    line.style.background = 'rgba(255,255,255,0.55)';
                                });
                            }}
                        >
                            {gpuError ? (
                                <span style={{ letterSpacing: '2px' }}>SYSTEM INCOMPATIBLE</span>
                            ) : isReadyToStart ? (
                                <>
                                    <span data-start-line aria-hidden="true" style={{ width: isMobile ? '28px' : '34px', height: '1px', background: 'rgba(255,255,255,0.55)', transition: 'background 240ms ease' }} />
                                    <span>START JOURNEY</span>
                                    <span data-start-line aria-hidden="true" style={{ width: isMobile ? '28px' : '34px', height: '1px', background: 'rgba(255,255,255,0.55)', transition: 'background 240ms ease' }} />
                                </>
                            ) : (
                                <span>
                                    {active ? "LOADING" : "CALIBRATING"}... {displayProgress}%
                                </span>
                            )}
                        </button>

                        <div style={{
                            width: '100%', maxWidth: '250px', height: '1px', background: '#222', margin: '10px auto',
                            opacity: (isReadyToStart || gpuError) ? 0 : 1, transition: 'opacity 0.5s'
                        }}>
                            <div style={{ width: `${displayProgress}%`, height: '100%', background: '#666', transition: 'width 0.2s' }} />
                        </div>
                    </div>

                    {/* Bottom Area: Controls */}
                    <div style={{
                        marginTop: isMobileLandscape ? '15px' : '44px',
                        color: '#ccc', opacity: 0.46, animation: 'fadeIn 3s ease',
                        userSelect: 'none', display: 'flex', justifyContent: 'center', gap: '24px',
                        flexDirection: 'row',
                    }}>
                        {gpuError ? (
                            <div style={{ fontSize: '0.8rem', maxWidth: '400px', lineHeight: '1.4', textAlign: 'center' }}>
                                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.7rem' }}>ERROR CODE: {gpuError}</p>
                            </div>
                        ) : (
                            isMobile ? (
                                <>
                                    <InstructionRow input={<Key>L-STICK</Key>} label="MOVE" />
                                    {/* Hide 'Touch' instruction on very small landscape screens if crowded */}
                                    <InstructionRow input={<Key>TOUCH</Key>} label="LOOK" />
                                </>
                            ) : (
                                <>
                                    <InstructionRow input={<><Key>W</Key><Key>A</Key><Key>S</Key><Key>D</Key></>} label="MOVE" />
                                    <InstructionRow input={<Key>SHIFT</Key>} label="RUN" />
                                    <InstructionRow input={<Key>C</Key>} label="CAM" />
                                    <InstructionRow input={<MouseIcon />} label="LOOK" />
                                </>
                            )
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
