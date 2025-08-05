import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import "./TextStagger.css";

gsap.registerPlugin(SplitText);

export default function TextStagger({ text, textColor, duplicateText = text, className }) {
    const spanRef = useRef(null);
    const duplicateSpanRef = useRef(null);
    const textCharsRef = useRef([]);
    const duplicateCharsRef = useRef([]);

    useEffect(() => {
        if (spanRef.current && duplicateSpanRef.current) {
            const split1 = new SplitText(spanRef.current, {
                type: "chars",
                charsClass: "char"
            });

            const split2 = new SplitText(duplicateSpanRef.current, {
                type: "chars",
                charsClass: "char-dup"
            });

            textCharsRef.current = split1.chars;
            duplicateCharsRef.current = split2.chars;
        }
    }, []);

    const slideUp = () => {
        const height = (spanRef.current.offsetHeight + 10);

        gsap.to(textCharsRef.current, {
            y: -height,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(duplicateCharsRef.current, {
            y: -height,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.out",
        });
    };

    const slideDown = () => {
        gsap.to(textCharsRef.current, {
            y: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(duplicateCharsRef.current, {
            y: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.out",
        });
    };



    return (
        <div className={`text-wrapper ${className}`}>
            <span
                onMouseEnter={slideUp}
                onMouseLeave={slideDown}
                className="resdsx"
            >
                <div className="text">
                    <span style={{ color: textColor }} ref={spanRef}>{text}</span>
                </div>
                <div className="text-duplicate">
                    <span style={{ color: textColor }} ref={duplicateSpanRef}>{duplicateText}</span>
                </div>
            </span>
        </div>
    );
}
