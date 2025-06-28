import "./Sidebar.css";
import React, { useEffect, useState, useRef } from "react";
import logo from "../../assets/Logos/logoYellowTransparent.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/x.svg";
import menuIcon from "../../assets/menu.svg";
import githubIcon from "../../assets/github.svg";
import searchIcon from "../../assets/search-1.svg";
import gsap from "gsap";
import { scale, transform } from "framer-motion";

export const navItems = [
    {
        category: "Introduction",
        className: "category",
        links: [{ name: "Introduction", path: "/app/intro" }],
    },
    {
        category: "Text Animations",
        className: "category",
        links: [{ name: "Link Text", path: "/app/link-text" }, { name: "Stagger Text", path: "/app/stagger-text" }],
    },
    {
        category: "Navigation",
        className: "nav-igation",
        links: [{ name: "Bottom Bar", path: "/app/bottom-nav" }],
    },
    {
        category: "Cursor Effects",
        className: "category",
        links: [{ name: "Cursor Draw", path: "/app/cursor-draw" }],
    },
    {
        category: "Buttons",
        className: "category",
        links: [{ name: "Comic Button", path: "/app/comic-button" }, { name: "Text Slide Button", path: "/app/text-slide-btn" }, { name: "Magnetic Button", path: "/app/magnetic-button" }],
    },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchBoxRef = useRef(null);
    const searchOverlayRef = useRef(null);
    const searchTimeline = useRef(null);
    const searchInputRef = useRef(null);
    const resultRefs = useRef([]);

    const filteredResults = navItems
        .flatMap((section) =>
            section.links.map((link) => ({ ...link, category: section.category }))
        )
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

    const updateScreenState = () => {
        if (window.innerWidth < 948) {
            gsap.set(".logoTop", { top: "-100%" });
            gsap.set(".main-sidebar", { left: "-100%", duration: 0.6, ease: "power4.inOut" });
            setIsMobile(true);
        } else {
            gsap.set(".logoTop", { top: "0" });
            gsap.set(".main-sidebar", { left: 0, duration: 0.6, ease: "power4.inOut" });
            setIsMobile(false);
        }
    };

    useEffect(() => {
        updateScreenState();
        window.addEventListener("resize", updateScreenState);

        searchTimeline.current = gsap.timeline({
            paused: true,
            onStart: () => {
                document.body.style.overflowY = "hidden";
                setTimeout(() => {
                    searchInputRef.current?.focus();
                }, 0);
            },
            onReverseComplete: () => {
                setQuery("");
                setSelectedIndex(-1);
                document.body.style.overflowY = "auto";
            },
        });

        searchTimeline.current.to(".main-search-box", {
            zIndex: "1000000",
            opacity: 1,
            duration: 0.2,
            ease: "power2",
            pointerEvents: "auto",
        });
        searchTimeline.current.to(".search-box", {
            transform: "scale(1)",
            opacity: 1,
            duration: 0.2,
            ease: "power2",
        }, "-=0.2");

        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                searchTimeline.current.play();
            } else if (e.key === "Escape") {
                searchTimeline.current.reverse();
            }
        };

        const handleClickOutside = (e) => {
            if (
                searchBoxRef.current &&
                !searchBoxRef.current.contains(e.target) &&
                searchOverlayRef.current &&
                searchOverlayRef.current.contains(e.target)
            ) {
                searchTimeline.current.reverse();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", updateScreenState);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
                navigate(filteredResults[selectedIndex].path);
                searchTimeline.current.reverse();
            } else if (query !== "" && filteredResults.length > 0) {
                navigate(filteredResults[0].path);
                searchTimeline.current.reverse();
            }
        }
    };

    useEffect(() => {
        if (selectedIndex >= 0 && resultRefs.current[selectedIndex]) {
            resultRefs.current[selectedIndex].scrollIntoView({ block: "nearest" });
        }
    }, [selectedIndex]);

    const openMenu = () => {
        gsap.to(".main-sidebar", { left: 0, duration: 0.6, ease: "power4.inOut" });
        if (window.innerWidth < 948) {
            gsap.to(".logoTop", { top: 0, duration: 0.6, ease: "power4.inOut" });
            gsap.to(".main-docs", { opacity: 0.2, duration: 0.6, ease: "power4.inOut" });
        }
    };

    const closeMenu = () => {
        gsap.to(".main-sidebar", { left: "-100%", duration: 0.6, ease: "power4.in" });
        if (window.innerWidth < 948) {
            gsap.to(".logoTop", { top: "-100%", duration: 0.6, ease: "power4.in" });
            gsap.to(".main-docs", { opacity: 1, duration: 0.6, ease: "power4.inOut" });
        }
    };

    return (
        <>
            <div className="nav-mobile">
                <div className="logo-mobile">
                    <img src={logo} alt="Logo" />
                </div>
                <div onClick={() => { searchTimeline.current.play(); }} className="searchIcon">
                    <img src={searchIcon} alt="" />
                </div>
                <div onClick={openMenu} className="menuIcon">
                    <img src={menuIcon} alt="Menu" />
                </div>
            </div>

            <div className="main-search-box" ref={searchOverlayRef}>
                <div className="search-box" ref={searchBoxRef}>
                    <div className="input-search">
                        <img src={searchIcon} alt="Search Icon" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for components"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setSelectedIndex(-1);
                            }}
                            onKeyDown={handleInputKeyDown}
                        />
                        <svg onClick={() => searchTimeline.current.reverse()} data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "currentcolor" }}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.5 11.5607L6.03033 11.0303L8 9.06066L9.96967 11.0303L10.5 11.5607L11.5607 10.5L11.0303 9.96967L9.06066 8L11.0303 6.03033L11.5607 5.5L10.5 4.43934L9.96967 4.96967L8 6.93934L6.03033 4.96967L5.5 4.43934L4.43934 5.5L4.96967 6.03033L6.93934 8L4.96967 9.96967L4.43934 10.5L5.5 11.5607Z" fill="currentColor"></path>
                        </svg>
                    </div>

                    <div className="results-search">
                        <div className="results-success" style={{ display: query !== "" && filteredResults.length > 0 ? "flex" : "none" }}>
                            {filteredResults.map((item, index) => (
                                <div
                                    key={index}
                                    ref={(el) => resultRefs.current[index] = el}
                                    className={`result ${selectedIndex === index ? "selected" : ""}`}
                                    onClick={() => {
                                        navigate(item.path);
                                        searchTimeline.current.reverse();
                                    }}
                                >
                                    <div className="left-result-search">
                                        <div className="icon-left-search"></div>
                                        <div className="wrap-acm">
                                            <div className="search-result-item">{item.name}</div>
                                            <span>{item.category}</span>
                                        </div>
                                    </div>
                                    <div className="enterIcon">
                                        <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: 'rgb(114 114 114)' }}><path fillRule="evenodd" clipRule="evenodd" d="M13.5 3V2.25H15V3V10C15 10.5523 14.5523 11 14 11H3.56068L5.53035 12.9697L6.06068 13.5L5.00002 14.5607L4.46969 14.0303L1.39647 10.9571C1.00595 10.5666 1.00595 9.93342 1.39647 9.54289L4.46969 6.46967L5.00002 5.93934L6.06068 7L5.53035 7.53033L3.56068 9.5H13.5V3Z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {query === "" && (
                            <div className="default-empty-search">
                                <div className="wrap-fasd">
                                    <span>I&apos;m looking for..</span>
                                    <div className="items-search">
                                        <div onClick={() => {
                                            navigate("/app/bottom-nav");
                                            searchTimeline.current.reverse();
                                        }} className="item-search"><p>Bottom Bar</p></div>
                                        <div onClick={() => {
                                            navigate("/app/link-text");
                                            searchTimeline.current.reverse();
                                        }} className="item-search"><p>Link Text</p></div>
                                        <div onClick={() => {
                                            navigate("/app/comic-button");
                                            searchTimeline.current.reverse();
                                        }} className="item-search"><p>Comic Button</p></div>
                                    </div>
                                </div>
                                <div className="links-search">
                                    <Link to={"/terms"}>Terms & Conditions</Link>
                                    <Link to={"/redirect/github"}>GitHub</Link>
                                </div>
                            </div>
                        )}

                        {query !== "" && filteredResults.length === 0 && (
                            <div className="not-found-search">
                                <span>No results found for <strong>{query}</strong></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="main-sidebar">
                <div className="logoTop">
                    <img src={logo} alt="Logo" />
                    <div className="nav-items">
                        <div onClick={() => { searchTimeline.current.play(); }} className="search">
                            <button>Search</button>
                            <img src={searchIcon} alt="Search Icon" />
                            <kbd>CTRL + K</kbd>
                        </div>
                        <div className="star-github">
                            <button onClick={() => { navigate("/redirect/github") }} id="buttonStar">
                                <img src={githubIcon} alt="GitHub" />Star on GitHub
                            </button>
                        </div>
                    </div>
                    <div onClick={closeMenu} className="close">
                        <img src={closeIcon} alt="Close" />
                    </div>
                </div>

                <div className="main">
                    <div className="sections">
                        {navItems.map((section, index) => (
                            <div className={`category ${section.className || "category"}`} key={index}>
                                <h1>{section.category}</h1>
                                <div className="items">
                                    {section.links.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            className={`item ${location.pathname === item.path ? "active" : ""}`}
                                            to={item.path}
                                            onClick={isMobile ? closeMenu : null}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
