import React, { useEffect, useRef } from "react";
import "./DotsBackground.css";

export default function BackgroundDots() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let dots = [];
    const spacing = 18;
    const dotSize = 1;
    const dotColors = [
      "#c3ddfc",
      "#a2d2ff",
      "#b5cfff",
      "#d1e3ff",
      "#3b6c8d",
      "#2f455c",
      "#94bfff",
      "#e1f0ff",
    ];

    const createDots = () => {
      const { width, height } = canvas.parentElement.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      dots = [];

      for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          dots.push({
            x,
            y,
            colorIndex: Math.floor(Math.random() * dotColors.length),
            changeTimer: Math.random() * 1000 + 500,
          });
        }
      }
    };

    const updateDots = (delta) => {
      dots.forEach((dot) => {
        dot.changeTimer -= delta;
        if (dot.changeTimer <= 0) {
          dot.colorIndex = Math.floor(Math.random() * dotColors.length);
          dot.changeTimer = Math.random() * 1000 + 500;
        }
      });
    };

    const renderDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = 0;
      const centerY = 0;

      dots.forEach((dot) => {
        const dx = dot.x - centerX;
        const dy = dot.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        ctx.fillStyle = dotColors[dot.colorIndex];
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    let lastTime = performance.now();
    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      updateDots(delta);
      renderDots();
      requestAnimationFrame(animate);
    };

    createDots();
    animate(lastTime);

    const resizeObserver = new ResizeObserver(createDots);
    resizeObserver.observe(canvas.parentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-layer"></canvas>;
}
