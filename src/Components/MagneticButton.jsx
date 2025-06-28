import React, { useEffect, useRef } from "react";
import "./MagneticButton.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function MagneticButton({ onClick, text, textColor, background }) {
    const outerRef = useRef(null);
    const btnRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        const outer = outerRef.current;
        const button = btnRef.current;
        const inner = innerRef.current.querySelectorAll("span");

        const handleMove = (e) => {
            const outerRect = outer.getBoundingClientRect();
            const btnRect = button.getBoundingClientRect();

            const relX = e.clientX - outerRect.left;
            const relY = e.clientY - outerRect.top;

            const centerX = outerRect.width / 2;
            const centerY = outerRect.height / 2;

            const btnHalfWidth = btnRect.width / 2;
            const btnHalfHeight = btnRect.height / 2;

            const limitFactor = 0.5; // Lower = less movement
            const maxX = ((outerRect.width / 2) - btnHalfWidth) * limitFactor;
            const maxY = ((outerRect.height / 2) - btnHalfHeight) * limitFactor;

            let offsetX = relX - centerX;
            let offsetY = relY - centerY;

            offsetX = Math.max(-maxX, Math.min(maxX, offsetX));
            offsetY = Math.max(-maxY, Math.min(maxY, offsetY));

            // kill any previous tweens to prevent laggy reset behavior
            gsap.killTweensOf([button, inner]);

            gsap.to(button, {
                x: offsetX,
                y: offsetY,
                duration: 0.9,
                ease: "power4.out"
            });

            gsap.to(inner, {
                x: offsetX * 0.4,
                y: offsetY * 0.4,
                // scale: 0.87,
                duration: 0.9,
                ease: "power4.out"
            });
        };

        const reset = () => {
            // kill any movement and bring back to center
            gsap.killTweensOf([button, inner]);

            gsap.to([button, inner], {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.34)"
            });
        };

        outer.addEventListener("mousemove", handleMove);
        outer.addEventListener("mouseleave", reset);

        return () => {
            outer.removeEventListener("mousemove", handleMove);
            outer.removeEventListener("mouseleave", reset);
        };
    }, []);



    return (
        <div className="outer-div" ref={outerRef}>
            <div className="magneticBtn">
                <button
                    onClick={onClick}
                    style={{ color: textColor, background: background }}
                    ref={btnRef}
                >
                    <div className="inner-div" ref={innerRef}>
                        <span>{text}</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
