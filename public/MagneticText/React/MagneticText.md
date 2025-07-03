## Coming soon!

A detailed tutorial for this component is on the way! In the meantime, feel free to explore and use the code below.

---

```codegroup

// MagneticText.jsx
import React, { useRef, useEffect } from "react";
import "./MagneticText.css";
import gsap from "gsap";

export default function MagneticText({ text, color = "#fff" }) {
    const outerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const outer = outerRef.current;
        const textEl = textRef.current;

        const handleMove = (e) => {
            const rect = outer.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            let offsetX = relX - centerX;
            let offsetY = relY - centerY;

            const limitFactor = 0.7; // more movement freedom
            const maxX = rect.width * 0.3;
            const maxY = rect.height * 0.3;

            offsetX = Math.max(-maxX, Math.min(maxX, offsetX)) * limitFactor;
            offsetY = Math.max(-maxY, Math.min(maxY, offsetY)) * limitFactor;

            gsap.killTweensOf(textEl);

            gsap.to(textEl, {
                x: offsetX,
                y: offsetY,
                duration: 1,
                ease: "power2.out"
            });
        };

        const reset = () => {
            gsap.killTweensOf(textEl);
            gsap.to(textEl, {
                x: 0,
                y: 0,
                duration: 1,
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
        <div className="magnetic-text-outer" ref={outerRef}>
            <span ref={textRef} style={{ color }}>{text}</span>
        </div>
    );
}




// MagneticText.css
.magnetic-text-outer {
    display: inline-block;
    position: relative;
    padding: 15px;
    cursor: pointer;
}
.magnetic-text-outer span {
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    will-change: transform;
    pointer-events: none;
    font-size: 30px;
    font-family: "Satoshi";
    color: white!important;
}


```

---

## Want to Contribute?

Are you a developer who enjoys sharing knowledge? We’d love your help writing a tutorial for this component! Visit our [GitHub repository](https://github.com/CraftedByLunar/platform) and become a contributor to the project.

---

```footer

```
