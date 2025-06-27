## Coming soon!

A detailed tutorial for this component is on the way! In the meantime, feel free to explore and use the code below.

---

```codegroup

// MagneticButton.jsx

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
        const inner = innerRef.current;

        const handleMove = (e) => {
            const outerRect = outer.getBoundingClientRect();
            const btnRect = button.getBoundingClientRect();

            const relX = e.clientX - outerRect.left;
            const relY = e.clientY - outerRect.top;

            const centerX = outerRect.width / 2;
            const centerY = outerRect.height / 2;

            const btnHalfWidth = btnRect.width / 2;
            const btnHalfHeight = btnRect.height / 2;

            const maxX = (outerRect.width / 2) - btnHalfWidth;
            const maxY = (outerRect.height / 2) - btnHalfHeight;

            let offsetX = relX - centerX;
            let offsetY = relY - centerY;

            offsetX = Math.max(-maxX, Math.min(maxX, offsetX));
            offsetY = Math.max(-maxY, Math.min(maxY, offsetY));

            // kill any previous tweens to prevent laggy reset behavior
            gsap.killTweensOf([button, inner]);

            gsap.to(button, {
                x: offsetX,
                y: offsetY,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });

            gsap.to(inner, {
                x: offsetX * 0.4,
                y: offsetY * 0.4,
                scale: 0.87,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
        };

        const reset = () => {
            // kill any movement and bring back to center
            gsap.killTweensOf([button, inner]);

            gsap.to([button, inner], {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)",
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


// MagneticButton.css
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

.outer-div {
  padding: 8px 15px;
  width: fit-content;
}

.magneticBtn button {
  border-radius: 50px;
  padding: 5px 10px;
  font-family: "Inter";
  letter-spacing: -0.03em;
  cursor: pointer;
  border: 1px solid black;
  font-size: 20px;
}

.inner-div {
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
}


```

---

## Want to Contribute?

Are you a developer who enjoys sharing knowledge? We’d love your help writing a tutorial for this component! Visit our [GitHub repository](https://github.com/CraftedByLunar/platform) and become a contributor to the project.

---

```footer

```
