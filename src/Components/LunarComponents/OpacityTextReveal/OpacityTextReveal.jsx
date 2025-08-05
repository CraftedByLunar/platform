import React, { useEffect, useRef } from "react";
import "./OpacityTextReveal.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// work in progress

export default function OpacityTextReveal({ text, color, scroller = null, className }) {
    const textRef = useRef(null);
    const spacerTopRef = useRef(null);
    const mainCenterRef = useRef(null);

    // set dynamic height
    useEffect(() => {
        function updateSpacerHeight() {
            const compPrev = document.getElementById("main-comp-prev")
            const height = compPrev.offsetHeight;
            spacerTopRef.current.style.height = `${height}px`;
            mainCenterRef.current.style.height = `${height}px`;
        }

        updateSpacerHeight();
        window.addEventListener("resize", updateSpacerHeight);

        return () => {
            window.removeEventListener("resize", updateSpacerHeight);
        };
    }, []);

    // text animation
    useEffect(() => {
        const split = new SplitText(textRef.current, {
            type: "words",
            wordsClass: "opacityWord",
        });

        gsap.fromTo(
            ".opacityWord",
            { opacity: 0.3 },
            {
                opacity: 1,
                stagger: 0.2,
                duration: 0.8,
                scrollTrigger: {
                    trigger: ".main-opacity-text",
                    start: "top top+=100%",
                    scrub: true,
                    scroller: scroller || undefined,
                },
            }
        );

        return () => {
            split.revert();
        };
    }, [scroller]);

    return (
        <>
            <div className={`spacer-top ${className}"`} ref={spacerTopRef}>
                <h1>Scroll Down</h1>
            </div>
            <div className="main-center" ref={mainCenterRef}>
                <div className="main-opacity-text">
                    <h1 ref={textRef} style={{ color }}>{text}</h1>
                </div>
            </div>
        </>
    );
}
