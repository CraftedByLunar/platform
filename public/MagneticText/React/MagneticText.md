## Coming soon!

A detailed tutorial for this component is on the way! In the meantime, feel free to explore and use the code below.

---

```codegroup

// MagneticText.jsx
import React, { useRef, useEffect, useState } from "react";
import "./MagneticText.css";
import gsap from "gsap";

export default function MagneticText({ text, color = "#fff", className }) {
  const outerRef = useRef(null);
  const textRef = useRef(null);

  const [magnetActive, setMagnetActive] = useState(false);
  const magnetActiveRef = useRef(false);

  useEffect(() => {
    magnetActiveRef.current = magnetActive;
  }, [magnetActive]);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const magneticRadius = 100; // px distance for attraction
    const radiusBuffer = -20; // buffer
    const intensity = 0.5; // text movement strength

    const reset = () => {
      gsap.killTweensOf(textEl);
      gsap.to(textEl, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.34)",
      });
    };

    const handleMove = (e) => {
      if (!magnetActiveRef.current) return;

      const rect = textEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < magneticRadius + radiusBuffer) {
        gsap.to(textEl, {
          x: dx * intensity,
          y: dy * intensity,
          duration: 0.8,
          ease: "ease",
        });
      } else {
        magnetActiveRef.current = false;
        setMagnetActive(false);
        reset();
      }
    };

    const handleEnter = () => {
      magnetActiveRef.current = true;
      setMagnetActive(true);
    };

    const handleWindowLeave = () => {
      if (magnetActiveRef.current) {
        magnetActiveRef.current = false;
        setMagnetActive(false);
        reset();
      }
    };

    textEl.addEventListener("pointerenter", handleEnter);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleWindowLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      textEl.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mouseleave", handleWindowLeave);
    };
  }, []);

  return (
    <div className={`magnetic-text-outer ${className}`} ref={outerRef}>
      <span ref={textRef} style={{ color }}>
        {text}
      </span>
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
    font-size: 30px;
    font-family: "Satoshi";
}



```

---

## Want to Contribute?

Are you a developer who enjoys sharing knowledge? We’d love your help writing a tutorial for this component! Visit our [GitHub repository](https://github.com/CraftedByLunar/platform) and become a contributor to the project.

---

```footer

```
