import React, { useRef } from "react";
import "./TextScramble.css";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function TextScramble({ text, color = "#fff", className }) {
    const textRef = useRef(null);

    const playScramble = () => {
        gsap.to(textRef.current, {
            duration: 0.6,
            scrambleText: {
                text: text,
                chars: "!@#$%^&*",
                revealDelay: 0.1,
                tweenLength: false,
            },
            ease: "power1.inOut",
        });
    };

    return (
        <div
            className={`text-scramble ${className}`}
            onMouseEnter={playScramble}
        >
            <span ref={textRef} style={{ color }}>{text}</span>
        </div>
    );
}
