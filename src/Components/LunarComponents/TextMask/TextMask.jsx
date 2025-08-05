import React from "react";
import "./TextMask.css";
import gsap from "gsap";
import SplitText from "gsap/SplitText";


// work in progress.......

gsap.registerPlugin(SplitText)

export default function TextMask({ text, type, tag = "h1", className }) {
    const Tag = tag; // 'h1', 'h2', 'p', etc.

    const split = new SplitText()

    return (
        <div className={`txt-mask ${className}`}>
            {React.createElement(Tag, { className: "text-mask-heading" }, text)}
        </div>
    );
}
