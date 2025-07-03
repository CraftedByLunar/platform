import gsap from "gsap";
import React, { useRef } from "react";
import "./LinkText.css";


export default function LinkText({ text = "Hover Me!", to, className }) {
    const underLineRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.fromTo(underLineRef.current, {
            x: "-101%", // Smooth animation using transformX

        }, {
            x: "0",
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(underLineRef.current, {
            x: "101%", // Reset animation using transformX
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
            onComplete: () => {
                gsap.set(underLineRef.current, { x: "-101%" })
            }
        });
    };

    return (
        <>
            {/* The Actual Code */}
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`linkText ${className}`}
            >
                <a href={to}>{text}</a>
                <div ref={underLineRef} className="underLine"></div>
            </div>
        </>
    );
}
