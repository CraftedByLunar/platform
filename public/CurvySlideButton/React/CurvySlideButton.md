## Coming soon!

A detailed tutorial for this component is on the way! In the meantime, feel free to explore and use the code below.

---

```codegroup

// CurvySlideButton.jsx
import React, { useRef, useEffect } from "react";
import "./CurvySlideButton.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function CurvySlideButton({
  onClick,
  text = "Hover Me!",
  color = "#FFFB00",
  textColor = "black",
  borderColor = "black",
  hoverTextColor = "white",
  hoverColor = "black",
  styles,
}) {
  const blobRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    CustomEase.create("smoothEase", "0.622, 0.057, 0, 1.1");
  }, []);

  const slideIn = () => {
    if (!blobRef.current || !textRef.current) return;
    gsap.killTweensOf([blobRef.current, textRef.current]);

    gsap.to(blobRef.current, {
      top: "0%",
      borderRadius: "0px",
      ease: "smoothEase",
      duration: 0.5,
    });

    gsap.to(textRef.current, {
      color: hoverTextColor,
      ease: "smoothEase",
      duration: 0.3,
    });
  };

  const slideOut = () => {
    if (!blobRef.current || !textRef.current) return;
    gsap.killTweensOf([blobRef.current, textRef.current]);

    gsap.to(blobRef.current, {
      top: "100%",
      borderRadius: "100%",
      ease: "smoothEase",
      duration: 0.5,
    });

    gsap.to(textRef.current, {
      color: textColor,
      ease: "smoothEase",
      duration: 0.3,
    });
  };

  return (
    <div
      onMouseEnter={slideIn}
      onMouseLeave={slideOut}
      className="btn-animated"
    >
      <button
        onClick={onClick}
        style={{
          ...styles,
          color: textColor,
          background: color,
          border: `2px solid ${borderColor}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span ref={textRef}>{text}</span>
        <div
          style={{ background: hoverColor }}
          ref={blobRef}
          className="blob"
        ></div>
      </button>
    </div>
  );
}


// CurvySlideButton.css
.btn-animated {
    position: relative;
    display: inline-block;
}

.btn-animated button {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    width: fit-content;
    align-items: center;
    font-family: "Inter";
    letter-spacing: -0.02em;
    border-radius: 30px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: none;
    outline: none;
    transition: background-color 0.3s ease;
}

.btn-animated button span {
    position: relative;
    z-index: 2;
}

.icon {
    height: 20px;
    position: relative;
    z-index: 2;
}

.icon img {
    height: 20px;
    filter: invert(100%) sepia(1%) saturate(1902%) hue-rotate(297deg) brightness(119%) contrast(96%);
}

.blob {
    position: absolute;
    top: 100%;
    /* Initial hidden position */
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 50%;
    pointer-events: none;
}



```

---

## Want to Contribute?

Are you a developer who enjoys sharing knowledge? We’d love your help writing a tutorial for this component! Visit our [GitHub repository](https://github.com/CraftedByLunar/platform) and become a contributor to the project.

---

```footer

```
