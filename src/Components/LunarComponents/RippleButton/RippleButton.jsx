import React, { useEffect, useRef, useState } from "react";
import "./RippleButton.css";
import gsap from "gsap";

export default function RippleButton({ ...props }) {
  const {
    text = "Hover Me!",
    background = "#fbff00ff",
    textColor = "black",
    hoverTextColor = "black",
    hoverFlairColor = "#bcd102ff",
    className,
    onClick,
    icon,
    fontSize = "15px",
    iconSize,
    borderRadius = "50px",
    buttonWidth = "150px",
    buttonPadding = "10px",
    buttonHeight,
    border = "1px solid",
    iconFilter,
    hoverIconFilter,
    style,
    ...restProps
  } = props;

  const buttonRef = useRef(null);
  const flairRef = useRef(null);
  const labelRef = useRef(null);
  const xSetRef = useRef(null);
  const ySetRef = useRef(null);

  const [currentFilter, setCurrentFilter] = useState(iconFilter);
  const [currentBg, setCurrentBg] = useState(background);
  const [currentColor, setCurrentColor] = useState(textColor);

  useEffect(() => {
    setCurrentFilter(iconFilter);
    setCurrentBg(background);
    setCurrentColor(textColor);

    if (labelRef.current && textColor) {
      gsap.to(labelRef.current, {
        color: textColor,
        duration: 0.2,
      });
    }

    if (buttonRef.current && background) {
      gsap.to(buttonRef.current, {
        backgroundColor: background,
        duration: 0.2,
      });
    }
  }, [background, textColor, iconFilter]);

  useEffect(() => {
    if (!buttonRef.current || !flairRef.current) return;

    xSetRef.current = gsap.quickSetter(flairRef.current, "xPercent");
    ySetRef.current = gsap.quickSetter(flairRef.current, "yPercent");

    const getXY = (e) => {
      const { left, top, width, height } =
        buttonRef.current.getBoundingClientRect();

      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
      };
    };

    const handleMouseEnter = (e) => {
      const { x, y } = getXY(e);
      xSetRef.current(x);
      ySetRef.current(y);

      gsap.to(flairRef.current, {
        scale: 1.2,
        duration: 0.4,
        ease: "power2.out",
      });

      if (hoverTextColor && labelRef.current) {
        gsap.to(labelRef.current, {
          color: hoverTextColor,
          duration: 0.2,
        });
      }

      setCurrentFilter(hoverIconFilter);
    };

    const handleMouseLeave = (e) => {
      const { x, y } = getXY(e);
      gsap.killTweensOf(flairRef.current);
      gsap.to(flairRef.current, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      if (textColor && labelRef.current) {
        gsap.to(labelRef.current, {
          color: textColor,
          duration: 0.2,
        });
      }

      setCurrentFilter(iconFilter);
    };

    const handleMouseMove = (e) => {
      const { x, y } = getXY(e);
      gsap.to(flairRef.current, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    };

    const button = buttonRef.current;
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousemove", handleMouseMove);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoverTextColor, textColor, iconFilter, hoverIconFilter]);

  if (!icon && !text) return null;

  return (
    <div
      style={{ width: buttonWidth, ...style }}
      className={`main-ripple-btn ${className || ""}`}
    >
      <button
        ref={buttonRef}
        id="ripple-btn"
        onClick={onClick}
        style={{
          border,
          background: currentBg,
          color: currentColor,
          borderRadius,
          width: buttonWidth,
          height: buttonHeight,
          padding: buttonPadding,
        }}
        {...restProps}
      >
        <span
          ref={flairRef}
          className="button-flair"
          style={{
            "--hover-color": hoverFlairColor,
          }}
        ></span>

        <div className="icon-text" ref={labelRef}>
          {icon && (
            <span className="icon">
              {typeof icon === "string" ? (
                <img
                  src={icon}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    filter: currentFilter,
                  }}
                  alt="icon"
                  className="ripple-icon-img"
                />
              ) : (
                icon
              )}
            </span>
          )}
          {text && (
            <span style={{ fontSize: fontSize }} className="text">
              {text}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
