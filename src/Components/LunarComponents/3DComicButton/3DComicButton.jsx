import React, { useRef } from "react";
import gsap from "gsap";
import "./3DComicButton.css";

export default function ComicButton({ onClick, text, borderColor, color, textColor, className }) {

    const buttonRef = useRef(null)

    const handleMouseEnter = () => {
        gsap.to(buttonRef.current, {
            duration: 0.1,
            y: -4, // Pushes the button up
            ease: "bounce.inOut",
            boxShadow: "0px 4px 0 var(--border-color)", // Restores shadow
            overwrite: true
        });
    };

    const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
            duration: 0.1,
            y: 0, // Returns the button to its original position
            ease: "bounce.inOut",
            boxShadow: "0px 0px 0 var(--border-color)", // Removes shadow
            overwrite: true
        });
    };

    const handleMouseDown = () => {
        gsap.to(buttonRef.current, {
            duration: 0.05,
            y: 4, // Pushes the button down
            ease: "bounce.inOut",
            boxShadow: "0px 2px 0 var(--border-color)",
            overwrite: true
        });
    };

    const handleMouseUp = () => {
        handleMouseEnter(); // Return to hover state on mouse release
    };

    return (
        <button
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={onClick}
            className={`button ${className}`}
            style={{
                "--border-color": borderColor,
                "--button-color": color,
                "--text-color": textColor,
            }}
        >
            {text}
        </button>
    );

}   
