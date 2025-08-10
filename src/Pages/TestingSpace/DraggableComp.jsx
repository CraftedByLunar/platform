import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import "./DraggableComp.css";

// this is a work in progress component and i am too lazy to finish this - mohit

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function InfiniteDraggableGrid({
  images = [],
  tileSize = 200,
  gap = 20,
}) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const fullSize = tileSize + gap;
    const cols = Math.ceil(containerWidth / fullSize) + 20;
    const rows = Math.ceil(containerHeight / fullSize) + 20;
    const tiles = [];

    wrapper.innerHTML = "";

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const tile = document.createElement("div");
        tile.className = "grid-tile";
        tile.style.width = `${tileSize}px`;
        tile.style.height = `${tileSize}px`;
        tile.style.left = `${x * fullSize}px`;
        tile.style.top = `${y * fullSize}px`;

        const img = document.createElement("img");
        img.src = images[Math.floor(Math.random() * images.length)];
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        tile.appendChild(img);

        wrapper.appendChild(tile);

        tiles.push({
          el: tile,
          img,
          baseX: x * fullSize,
          baseY: y * fullSize,
          extraX: 0,
          extraY: 0,
          gridX: x,
          gridY: y,
          currentOffsetX: 0,
          currentOffsetY: 0,
          targetOffsetX: 0,
          targetOffsetY: 0,
        });
      }
    }

    let dragX = 0;
    let dragY = 0;
    let prevDragX = 0;
    let prevDragY = 0;
    let smoothVelocityX = 0;
    let smoothVelocityY = 0;
    let isAnimating = false;

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function animate() {
      if (!isAnimating) return;

      for (const tile of tiles) {
        // Faster interpolation for more responsive parallax
        tile.currentOffsetX = lerp(
          tile.currentOffsetX,
          tile.targetOffsetX,
          0.1
        );
        tile.currentOffsetY = lerp(
          tile.currentOffsetY,
          tile.targetOffsetY,
          0.1
        );

        gsap.set(tile.el, {
          x: tile.extraX + tile.currentOffsetX,
          y: tile.extraY + tile.currentOffsetY,
          overwrite: "auto",
        });
      }

      requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    }

    function stopAnimation() {
      isAnimating = false;
    }

    Draggable.create(wrapper, {
      type: "x,y",
      inertia: true,
      allowNativeTouchScrolling: false,
      trigger: container,
      onDragStart: () => {
        startAnimation();
      },
      onDrag: () => {
        prevDragX = dragX;
        prevDragY = dragY;
        dragX = gsap.getProperty(wrapper, "x");
        dragY = gsap.getProperty(wrapper, "y");

        const deltaX = dragX - prevDragX;
        const deltaY = dragY - prevDragY;

        smoothVelocityX = lerp(smoothVelocityX, deltaX, 0.3);
        smoothVelocityY = lerp(smoothVelocityY, deltaY, 0.3);

        updateTiles();
      },
      onThrowUpdate: () => {
        prevDragX = dragX;
        prevDragY = dragY;
        dragX = gsap.getProperty(wrapper, "x");
        dragY = gsap.getProperty(wrapper, "y");

        const deltaX = dragX - prevDragX;
        const deltaY = dragY - prevDragY;

        smoothVelocityX = lerp(smoothVelocityX, deltaX, 0.1);
        smoothVelocityY = lerp(smoothVelocityY, deltaY, 0.1);

        updateTiles();
      },
      onDragEnd: () => {
        // Don't stop animation immediately, let it settle
      },
      onThrowComplete: () => {
        // Gradually reset offsets to zero
        for (const tile of tiles) {
          tile.targetOffsetX = 0;
          tile.targetOffsetY = 0;
        }

        // Stop animation after a delay to allow settling
        setTimeout(() => {
          stopAnimation();
        }, 500);
      },
    });

    function updateTiles() {
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      const marginBuffer = 80;
      const offsetStrength = 80;

      for (const tile of tiles) {
        let posX = tile.baseX + dragX + tile.extraX;
        let posY = tile.baseY + dragY + tile.extraY;

        // Handle wrapping
        if (posX > containerWidth + marginBuffer)
          tile.extraX -= cols * fullSize;
        if (posX + tileSize < -marginBuffer) tile.extraX += cols * fullSize;
        if (posY > containerHeight + marginBuffer)
          tile.extraY -= rows * fullSize;
        if (posY + tileSize < -marginBuffer) tile.extraY += rows * fullSize;

        // Recalculate position after potential wrapping
        posX = tile.baseX + dragX + tile.extraX;
        posY = tile.baseY + dragY + tile.extraY;

        // Calculate depth effect based on ACTUAL screen position (including wrapping)
        const actualTileCenterX = posX + tileSize / 2;
        const actualTileCenterY = posY + tileSize / 2;

        // Distance from screen center
        const distFromCenterX = (actualTileCenterX - centerX) / centerX;
        const distFromCenterY = (actualTileCenterY - centerY) / centerY;
        const distance = Math.sqrt(distFromCenterX ** 2 + distFromCenterY ** 2);

        // Apply parallax effect based on actual screen position
        const depthFactor = Math.max(0.3, 1 - distance * 0.5);

        const offsetX = -smoothVelocityX * depthFactor * offsetStrength * 0.01;
        const offsetY = -smoothVelocityY * depthFactor * offsetStrength * 0.01;

        tile.targetOffsetX = offsetX;
        tile.targetOffsetY = offsetY;
      }
    }

    return () => {
      stopAnimation();
    };
  }, [images, tileSize, gap]);

  return (
    <div className="grid-container" ref={containerRef}>
      <div className="grid-wrapper" ref={wrapperRef}></div>
    </div>
  );
}
