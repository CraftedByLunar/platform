import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ImageTrail.css";

export default function ImageTrail({ images, maxTrailLength = 6 }) {
    const containerRef = useRef(null);
    const trailRefs = useRef([]);
    const imageIndex = useRef(0);
    const lastMoveTime = useRef(Date.now());
    const animationFrame = useRef();

    useEffect(() => {
        const container = containerRef.current;
        const imageSize = 280;
        const halfSize = imageSize / 2;
        const minDelayBetweenImages = 100; // for adjusting the speed of image spawn
        let lastSpawnTime = 0;


        const handleMouseMove = (e) => {
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            // stop if mouse position is outside the parent div
            if (
                e.clientX < rect.left || e.clientX > rect.right ||
                e.clientY < rect.top || e.clientY > rect.bottom
            ) return;

            const now = Date.now();
            if (now - lastSpawnTime < minDelayBetweenImages) return;
            lastSpawnTime = now;
            lastMoveTime.current = now;

            const x = e.clientX - rect.left - halfSize;
            const y = e.clientY - rect.top - halfSize;

            const img = document.createElement("img");
            img.src = images[imageIndex.current % images.length];
            img.className = "trail-image";
            img.style.transform = `translate(${x}px, ${y}px)`;
            container.appendChild(img);

            trailRefs.current.push(img);
            imageIndex.current++;

            gsap.fromTo(
                img,
                { scale: 0 },
                {
                    scale: 1,
                    ease: "power2.out",
                    duration: 0.5
                }
            );

            if (trailRefs.current.length > maxTrailLength) {
                const oldImg = trailRefs.current.shift();
                gsap.to(oldImg, {
                    scale: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => oldImg.remove()
                });
            }
        };


        const checkInactivity = () => {
            const now = Date.now();
            if (now - lastMoveTime.current > 100 && trailRefs.current.length > 0) {
                trailRefs.current.forEach((img) => {
                    gsap.to(img, {
                        scale: 0,
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => img.remove()
                    });
                });
                trailRefs.current = [];
            }
            animationFrame.current = requestAnimationFrame(checkInactivity);
        };

        container.addEventListener("mousemove", handleMouseMove);
        animationFrame.current = requestAnimationFrame(checkInactivity);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrame.current);
        };
    }, [images, maxTrailLength]);

    return <div className="main-image-trail" ref={containerRef}></div>;
}
