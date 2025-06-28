import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CursorDraw.css";

export default function CursorDraw() {
    const pathRef = useRef(null);
    const wrapperRef = useRef(null);
    const points = useRef([]);
    const idleTimeout = useRef(null);
    const trimming = useRef(false);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const path = pathRef.current;

        // convert points to a quadratic curve path
        const getSmoothPath = (pts) => {
            if (pts.length < 2) return "";
            let d = `M ${pts[0][0]} ${pts[0][1]}`;
            for (let i = 1; i < pts.length - 1; i++) {
                const [x1, y1] = pts[i];
                const [x2, y2] = pts[i + 1];
                const cx = (x1 + x2) / 2;
                const cy = (y1 + y2) / 2;
                d += ` Q ${x1} ${y1}, ${cx} ${cy}`;
            }
            return d;
        };

        const updatePath = () => {
            const d = getSmoothPath(points.current);
            path.setAttribute("d", d);
        };

        const startIdleTrim = () => {
            if (trimming.current || points.current.length < 2) return;
            trimming.current = true;

            gsap.ticker.add(trimTick);
        };

        const stopIdleTrim = () => {
            trimming.current = false;
            gsap.ticker.remove(trimTick);
        };

        const trimTick = () => {
            if (points.current.length > 0) {
                points.current.shift();
                updatePath();
            } else {
                stopIdleTrim();
            }
        };

        const handleMouseMove = (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

            if (idleTimeout.current) clearTimeout(idleTimeout.current);
            stopIdleTrim();

            points.current.push([x, y]);

            // Keep only the last 45 points
            const max = 25;
            if (points.current.length > max) {
                points.current.splice(0, points.current.length - max);
            }

            updatePath();

            idleTimeout.current = setTimeout(() => {
                startIdleTrim();
            }, 100);
        };

        wrapper.addEventListener("mousemove", handleMouseMove);

        return () => {
            wrapper.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(idleTimeout.current);
            stopIdleTrim();
        };
    }, []);

    return (
        <div className="draw-wrapper" ref={wrapperRef}>
            <h1>Move your mouse!</h1>
            <svg className="draw-canvas">
                <path ref={pathRef} className="draw-path" fill="none" />
            </svg>
        </div>
    );
}
