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
