import React from "react";
import "./MageneticText.css"
import gsap from "gsap";

export default function MageneticText({ text, color }) {
    return (
        <div className="magnetic-txt-outer">
            <span>{text}</span>
        </div>
    )
}