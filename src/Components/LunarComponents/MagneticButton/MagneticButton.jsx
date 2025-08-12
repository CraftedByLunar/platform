import React, { useEffect, useRef, useState } from "react";
import "./MagneticButton.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function MagneticButton({
  onClick,
  text,
  textColor,
  background,
  className,
}) {
  const outerRef = useRef(null);
  const btnRef = useRef(null);
  const innerRef = useRef(null);

  const [magnetActive, setMagnetActive] = useState(false);
  const magnetActiveRef = useRef(false);

  useEffect(() => {
    magnetActiveRef.current = magnetActive;
  }, [magnetActive]);

  useEffect(() => {
    const outer = outerRef.current;
    const button = btnRef.current;
    const inner = innerRef.current
      ? innerRef.current.querySelectorAll("span")
      : [];

    if (!outer || !button) return;

    const magneticRadius = 120; // base radius
    const radiusBuffer = 5; //buffer
    const intensity = 0.3; // movement strength

    const reset = () => {
      gsap.killTweensOf([button, inner]);
      gsap.to([button, inner], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };

    const handleMove = (e) => {
      // only run when magnet has been activated by hovering the button
      if (!magnetActiveRef.current) return;

      const outerRect = outer.getBoundingClientRect();
      const centerX = outerRect.left + outerRect.width / 2;
      const centerY = outerRect.top + outerRect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      gsap.killTweensOf([button, inner]);

      if (distance < magneticRadius + radiusBuffer) {
        gsap.to(button, {
          x: dx * intensity,
          y: dy * intensity,
          duration: 0.35,
          ease: "power3.out",
        });

        gsap.to(inner, {
          x: dx * intensity * 0.4,
          y: dy * intensity * 0.4,
          duration: 0.35,
          ease: "power3.out",
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

    // If the pointer leaves the entire window, also reset
    const handleWindowLeave = () => {
      if (magnetActiveRef.current) {
        magnetActiveRef.current = false;
        setMagnetActive(false);
        reset();
      }
    };

    window.addEventListener("mousemove", handleMove);
    button.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mouseleave", handleWindowLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      button.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mouseleave", handleWindowLeave);
    };
  }, []);

  return (
    <div className={`outer-div ${className}`} ref={outerRef}>
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
