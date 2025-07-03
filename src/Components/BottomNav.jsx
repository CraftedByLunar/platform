import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./BottomNav.css";

export default function BottomNav({ items, className }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRefs = useRef([]);
    const itemsContainerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    useEffect(() => {
        const activeItem = itemRefs.current[activeIndex];
        const itemsContainer = itemsContainerRef.current;

        if (activeItem && itemsContainer) {
            const { offsetWidth: width, offsetLeft: left } = activeItem;

            gsap.to(".lunarNavActiveSelector", {
                width,
                left,
                duration: 0.4,
                ease: "power2.out",
            });
        }
    }, [activeIndex]);

    const handleMenuClick = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleItemMouseIn = (index) => {
        const currentItem = itemRefs.current[index];

        if (currentItem) {
            const { offsetWidth: width, offsetLeft: left } = currentItem;

            gsap.to(".lunarNavHoverSelector", {
                opacity: 1,
                width: width + 30,
                left: left - 15,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
            });
        }
    };

    const handleItemMouseLeave = () => {
        gsap.to(".lunarNavHoverSelector", {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
        });
    };

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={`lunarNavBarWrapper ${className}`} onMouseLeave={handleItemMouseLeave}>
            {/* Logo Section */}
            <div className="lunarNavLogo">
                <img
                    src="https://ywerf4fo8udqtrne.public.blob.vercel-storage.com/lunarNewTransparent-Cb4HhH8q32P1r4iX1bqmdSsfOioHyt.png"
                    alt="Logo"
                />
            </div>

            {/* Menu Button */}
            <div className="lunarNavMenuButtonWrapper">
                <div onClick={handleMenuClick} className="lunarNavMenuButton">
                    <div className={isMenuOpen ? "lunarNavLineOne" : "lunarNavLineOne active"}></div>
                    <div className={isMenuOpen ? "lunarNavLineTwo" : "lunarNavLineTwo active"}></div>
                </div>
            </div>

            {/* Navigation Items */}
            <div className="lunarNavItemsContainer" ref={itemsContainerRef}>
                <div className="lunarNavActiveSelector">
                    <div className="lunarNavDot"></div>
                </div>
                <div className="lunarNavHoverSelector"></div>
                {items.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className={`lunarNavItem ${activeIndex === index ? "active" : ""}`}
                        onMouseEnter={() => handleItemMouseIn(index)}
                        onClick={() => handleItemClick(index)}
                    >
                        <h1>{item}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
