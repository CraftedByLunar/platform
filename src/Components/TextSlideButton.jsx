
import React, { useRef, useEffect } from "react";
import "./TextSlideButton.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase)

export default function TextSlideButton({
    text,
    onClick,
    color,
    textColor,
    className,
    secondaryColor = textColor,
    secondaryTextColor = color
}) {
    const btnRef = useRef(null);
    const bgRef = useRef(null);
    const textRef = useRef(null);
    const duplicateTextRef = useRef(null);

    useEffect(() => {
        CustomEase.create("smoothEase", "0.87, 0, 0.13, 1");
        const btn = btnRef.current;
        const bg = bgRef.current;
        const textEl = textRef.current;
        const dupTextEl = duplicateTextRef.current;

        const handleEnter = () => {
            // BG animation
            gsap.fromTo(
                bg,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.3,
                    ease: "power3.inOut"
                }
            );

            // Text animation
            const height = textEl.offsetHeight;

            gsap.to(textEl, {
                y: -height,
                duration: 0.3,
                ease: "power3.inOut",
            });

            gsap.to(dupTextEl, {
                y: -height,
                duration: 0.3,
                ease: "power3.inOut",
            });
        };

        const handleLeave = () => {
            // BG animation
            gsap.to(bg, {
                clipPath: "inset(100% 0% 0% 0%)",
                duration: 0.3,
                ease: "power3.inOut"
            });

            // Text animation reset
            gsap.to([textEl, dupTextEl], {
                y: 0,
                duration: 0.3,
                ease: "power3.inOut",
            });
        };

        btn.addEventListener("mouseenter", handleEnter);
        btn.addEventListener("mouseleave", handleLeave);

        return () => {
            btn.removeEventListener("mouseenter", handleEnter);
            btn.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    return (
        <div className={`btn-slide ${className}`} ref={btnRef}>
            <button onClick={onClick} style={{ background: color }}>
                <div className="texts-btn">
                    <span
                        id="text-btn"
                        ref={textRef}
                        style={{ color: textColor }}
                    >
                        {text}
                    </span>
                    <span
                        id="text-btn-duplicate"
                        ref={duplicateTextRef}
                        style={{ color: secondaryTextColor }}
                    >
                        {text}
                    </span>
                </div>
                <div
                    ref={bgRef}
                    style={{
                        background: secondaryColor,
                        clipPath: "inset(100% 0% 0% 0%)"
                    }}
                    className="bg-slide"
                ></div>
            </button>
        </div>
    );
}