## Coming soon!

A detailed tutorial for this component is on the way! In the meantime, feel free to explore and use the code below.

---

```codegroup

// ImageTrail.jsx

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./ImageTrail.css";

export default function ImageTrail({ images, maxTrailLength = 6, className }) {
    const containerRef = useRef(null);
    const trailRefs = useRef([]);
    const [mouseMoving, setMouseMoving] = useState(false);
    const timeoutRef = useRef(null);
    const imageIndex = useRef(0);
    const imageQueue = useRef([]);
    const lastPos = useRef({ x: 0, y: 0 });
    const moveCount = useRef(0);
    const lastMoveTime = useRef(0);

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (isTouchDevice) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const currentTime = Date.now();

            // update position
            lastPos.current = { x: clientX, y: clientY };
            lastMoveTime.current = currentTime;

            if (!mouseMoving) {
                setMouseMoving(true);
            }

            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                if (Date.now() - lastMoveTime.current >= 300) {
                    setMouseMoving(false);
                    moveCount.current = 0;
                }
            }, 300);

            moveCount.current++;
            const switchEvery = 8;

            if (moveCount.current % switchEvery !== 0) return;

            const img = document.createElement("img");
            img.src = images[imageIndex.current % images.length];
            img.className = "trail-image";
            containerRef.current.appendChild(img);

            trailRefs.current.push(img);
            imageQueue.current.push(img);
            imageIndex.current++;

            gsap.fromTo(
                img,
                { x: clientX, y: clientY, scale: 0 },
                {
                    x: clientX,
                    y: clientY,
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
                    onComplete: () => {
                        oldImg.remove();
                    }
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(timeoutRef.current);
        };
    }, [images, maxTrailLength, mouseMoving]);

    // disappear animation
    useEffect(() => {
        if (!mouseMoving && trailRefs.current.length > 0) {
            trailRefs.current.forEach((img) => {
                gsap.to(img, {
                    scale: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        img.remove();
                    }
                });
            });
            trailRefs.current = [];
            imageQueue.current = [];
        }
    }, [mouseMoving]);

    return <div className={`main-image-trail ${className}`} ref={containerRef}></div>;
}


// ImageTrail.css
.main-image-trail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9999;
    overflow: hidden;
}

.trail-image {
    position: absolute;
    width: 280px;
    height: 280px;
    object-fit: cover;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    will-change: transform, opacity;
}



```

---

## Want to Contribute?

Are you a developer who enjoys sharing knowledge? We’d love your help writing a tutorial for this component! Visit our [GitHub repository](https://github.com/CraftedByLunar/platform) and become a contributor to the project.

---

```footer

```
