import "./Sidebar.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

import logo from "../../assets/Logos/logoYellowTransparent.svg";
import closeIcon from "../../assets/x.svg";
import menuIcon from "../../assets/menu.svg";
import githubIcon from "../../assets/github.svg";
import searchIcon from "../../assets/search-1.svg";

export const navItems = [
    {
        category: "Introduction",
        className: "category",
        links: [{ name: "Introduction", path: "/app/intro" }],
    },
    {
        category: "Text Animations",
        className: "category",
        links: [
            { name: "Link Text", path: "/app/link-text" },
            { name: "Stagger Text", path: "/app/stagger-text" },
            { name: "Scramble Text", path: "/app/scramble-text" },
            { name: "Magnetic Text", path: "/app/magnetic-text" }
        ],
    },
    {
        category: "Navigation",
        className: "nav-igation",
        links: [{ name: "Bottom Bar", path: "/app/bottom-nav" }],
    },
    {
        category: "Cursor Effects",
        className: "category",
        links: [
            { name: "Cursor Draw", path: "/app/cursor-draw" },
            { name: "Image Trail", path: "/app/image-trail" }
        ],
    },
    {
        category: "Buttons",
        className: "category",
        links: [
            { name: "Comic Button", path: "/app/comic-button" },
            { name: "Text Slide Button", path: "/app/text-slide-btn" },
            { name: "Magnetic Button", path: "/app/magnetic-button" },
            { name: "CSS-Only Bouncy Button", path: "/app/bouncy-button" }
        ],
    },
];

const MOBILE_BREAKPOINT = 948;

const POPULAR_COMPONENTS = [
    { name: "Bottom Bar", path: "/app/bottom-nav" },
    { name: "Link Text", path: "/app/link-text" },
    { name: "Comic Button", path: "/app/comic-button" },
    { name: "Image Trail", path: "/app/image-trail" },
    { name: "Magnetic Button", path: "/app/magnetic-button" }
];

const GSAP_ANIMATIONS = {
    sidebar: { duration: 0.6, ease: "power4.inOut" },
    popup: { duration: 0.2, ease: "power2" },
    search: { duration: 0.2, ease: "power2" }
};

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [isMobile, setIsMobile] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    
    const searchBoxRef = useRef(null);
    const searchOverlayRef = useRef(null);
    const searchTimeline = useRef(null);
    const searchInputRef = useRef(null);
    const resultRefs = useRef([]);
    const userIdRef = useRef(null);
    const popupRef = useRef(null);

    const filteredResults = navItems
        .flatMap(section => 
            section.links.map(link => ({ ...link, category: section.category }))
        )
        .filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
        );

    const updateScreenState = useCallback(() => {
        const isMobileView = window.innerWidth < MOBILE_BREAKPOINT;
        
        if (isMobileView) {
            gsap.set(".logoTop", { top: "-100%" });
            gsap.set(".main-sidebar", { left: "-100%" });
        } else {
            gsap.set(".logoTop", { top: "0" });
            gsap.set(".main-sidebar", { left: 0 });
        }
        
        setIsMobile(isMobileView);
    }, []);

    const openPopUp = useCallback((event) => {
        event.preventDefault();
        
        setIsPopUpOpen(prev => {
            const shouldOpen = !prev;
            const popupElement = ".popupSideDetails";
            
            if (shouldOpen) {
                gsap.fromTo(popupElement, {
                    scale: 0.9,
                    opacity: 0,
                    x: "-20px",
                    display: "none"
                }, {
                    display: "block",
                    scale: 1,
                    zIndex: 1000,
                    x: "0px",
                    opacity: 1,
                    ...GSAP_ANIMATIONS.popup
                });
            } else {
                gsap.to(popupElement, {
                    display: "none",
                    scale: 0.9,
                    zIndex: -1000,
                    x: "-20px",
                    opacity: 0,
                    ...GSAP_ANIMATIONS.popup
                });
            }
            
            return shouldOpen;
        });
    }, []);

    const openSearchModal = useCallback(() => {
        searchTimeline.current?.play();
    }, []);

    const closeSearchModal = useCallback(() => {
        searchTimeline.current?.reverse();
    }, []);

    const handleNavigate = useCallback((path) => {
        navigate(path);
        closeSearchModal();
    }, [navigate, closeSearchModal]);

    const openMenu = useCallback(() => {
        gsap.to(".main-sidebar", { left: 0, ...GSAP_ANIMATIONS.sidebar });
        
        if (window.innerWidth < MOBILE_BREAKPOINT) {
            gsap.to(".logoTop", { top: 0, ...GSAP_ANIMATIONS.sidebar });
            gsap.to(".main-docs", { opacity: 0.2, ...GSAP_ANIMATIONS.sidebar });
        }
    }, []);

    const closeMenu = useCallback(() => {
        gsap.to(".main-sidebar", { left: "-100%", duration: 0.6, ease: "power4.in" });
        
        if (window.innerWidth < MOBILE_BREAKPOINT) {
            gsap.to(".logoTop", { top: "-100%", duration: 0.6, ease: "power4.in" });
            gsap.to(".main-docs", { opacity: 1, ...GSAP_ANIMATIONS.sidebar });
        }
    }, []);

    const handleInputKeyDown = useCallback((e) => {
        const actions = {
            ArrowDown: () => {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
            },
            ArrowUp: () => {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            },
            Enter: () => {
                const selectedItem = filteredResults[selectedIndex];
                const targetPath = selectedItem?.path || (filteredResults.length > 0 ? filteredResults[0].path : null);
                
                if (targetPath) {
                    handleNavigate(targetPath);
                }
            }
        };

        actions[e.key]?.();
    }, [filteredResults, selectedIndex, handleNavigate]);

    useEffect(() => {
        updateScreenState();
        window.addEventListener("resize", updateScreenState);

        searchTimeline.current = gsap.timeline({
            paused: true,
            onStart: () => {
                document.body.style.overflowY = "hidden";
                setTimeout(() => searchInputRef.current?.focus(), 0);
            },
            onReverseComplete: () => {
                setQuery("");
                setSelectedIndex(-1);
                document.body.style.overflowY = "auto";
            },
        });

        searchTimeline.current
            .to(".main-search-box", {
                zIndex: "1000000",
                opacity: 1,
                pointerEvents: "auto",
                ...GSAP_ANIMATIONS.search
            })
            .to(".search-box", {
                transform: "scale(1)",
                opacity: 1,
                ...GSAP_ANIMATIONS.search
            }, "-=0.2");

        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                openSearchModal();
            } else if (e.key === "Escape") {
                closeSearchModal();
            }
        };

        const handleClickOutside = (e) => {
            if (searchBoxRef.current && 
                !searchBoxRef.current.contains(e.target) &&
                searchOverlayRef.current?.contains(e.target)) {
                closeSearchModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", updateScreenState);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [updateScreenState, openSearchModal, closeSearchModal]);

    useEffect(() => {
        const handleClickOutsideUser = (e) => {
            if (userIdRef.current && 
                popupRef.current &&
                !userIdRef.current.contains(e.target) &&
                !popupRef.current.contains(e.target)) {
                setIsPopUpOpen(false);
                gsap.to(".popupSideDetails", {
                    display: "none",
                    scale: 0.9,
                    zIndex: -1000,
                    x: "-20px",
                    opacity: 0,
                    ...GSAP_ANIMATIONS.popup
                });
            }
        };

        document.addEventListener("mousedown", handleClickOutsideUser);
        return () => document.removeEventListener("mousedown", handleClickOutsideUser);
    }, []);

    useEffect(() => {
        if (selectedIndex >= 0 && resultRefs.current[selectedIndex]) {
            resultRefs.current[selectedIndex].scrollIntoView({ block: "nearest" });
        }
    }, [selectedIndex]);

    const handleDisabledClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    const renderSearchResults = () => {
        if (query === "") {
            return (
                <div className="default-empty-search">
                    <div className="wrap-fasd">
                        <span>Popular Components</span>
                        <div className="items-search">
                            {POPULAR_COMPONENTS.map(item => (
                                <div 
                                    key={item.path}
                                    onClick={() => handleNavigate(item.path)} 
                                    className="item-search"
                                >
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="links-search">
                        <Link to="/terms">Terms & Conditions</Link>
                        <Link to="/redirect/github">GitHub</Link>
                    </div>
                </div>
            );
        }

        if (filteredResults.length === 0) {
            return (
                <div className="not-found-search">
                    <span>No results found for <strong>"{query}"</strong></span>
                    <p>But you can change that, <Link to="/github">contribute now!</Link></p>
                </div>
            );
        }

        return (
            <div className="results-success">
                <div className="result-wrapper">
                    {filteredResults.map((item, index) => (
                        <div
                            key={index}
                            ref={el => resultRefs.current[index] = el}
                            className={`result ${selectedIndex === index ? "selected" : ""}`}
                            onClick={() => handleNavigate(item.path)}
                        >
                            <div className="left-result-search">
                                <div className="icon-left-search"></div>
                                <div className="wrap-acm">
                                    <div className="search-result-item">{item.name}</div>
                                    <span>{item.category}</span>
                                </div>
                            </div>
                            <div className="enterIcon">
                                <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: 'rgb(114 114 114)' }}>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.5 3V2.25H15V3V10C15 10.5523 14.5523 11 14 11H3.56068L5.53035 12.9697L6.06068 13.5L5.00002 14.5607L4.46969 14.0303L1.39647 10.9571C1.00595 10.5666 1.00595 9.93342 1.39647 9.54289L4.46969 6.46967L5.00002 5.93934L6.06068 7L5.53035 7.53033L3.56068 9.5H13.5V3Z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderPopupItems = () => {
        const items = [
            { icon: "M14 3H2C1.72386 3 1.5 3.22386 1.5 3.5V5L14.5 5V3.5C14.5 3.22386 14.2761 3 14 3ZM1.5 12.5V6.5L14.5 6.5V12.5C14.5 12.7761 14.2761 13 14 13H2C1.72386 13 1.5 12.7761 1.5 12.5ZM2 1.5C0.895431 1.5 0 2.39543 0 3.5V12.5C0 13.6046 0.895431 14.5 2 14.5H14C15.1046 14.5 16 13.6046 16 12.5V3.5C16 2.39543 15.1046 1.5 14 1.5H2ZM4 10.75C4.41421 10.75 4.75 10.4142 4.75 10C4.75 9.58579 4.41421 9.25 4 9.25C3.58579 9.25 3.25 9.58579 3.25 10C3.25 10.4142 3.58579 10.75 4 10.75Z", text: "Billing" },
            { icon: "M2.5 3.25C2.5 1.45507 3.95507 0 5.75 0H6.25C8.04493 0 9.5 1.45507 9.5 3.25V3.75C9.5 5.54493 8.04493 7 6.25 7H5.75C3.95507 7 2.5 5.54493 2.5 3.75V3.25ZM5.75 1.5C4.7835 1.5 4 2.2835 4 3.25V3.75C4 4.7165 4.7835 5.5 5.75 5.5H6.25C7.2165 5.5 8 4.7165 8 3.75V3.25C8 2.2835 7.2165 1.5 6.25 1.5H5.75ZM1.5 13.1694C2.32482 11.4909 3.71318 10.5 5.5 10.5V9C2.97349 9 1.0827 10.4894 0.0690305 12.6857L0 12.8353V13V15.25V16H0.75H5.5V14.5H1.5V13.1694ZM10.0915 10.2175C10.4564 10.0309 10.7944 9.70265 10.9642 9.25H11.0358C11.2056 9.70265 11.5436 10.0309 11.9085 10.2175C11.9698 10.2488 12.0294 10.2833 12.0871 10.3208C12.4317 10.5446 12.886 10.6736 13.3637 10.5941L13.3994 10.6559C13.0923 11.0289 12.9765 11.4857 12.9973 11.8955C12.9991 11.93 13 11.9649 13 12C13 12.0351 12.9991 12.07 12.9973 12.1044C12.9765 12.5143 13.0923 12.9711 13.3994 13.3441L13.3637 13.4059C12.886 13.3264 12.4317 13.4554 12.0871 13.6792C12.0294 13.7167 11.9698 13.7512 11.9085 13.7825C11.5436 13.9691 11.2056 14.2973 11.0358 14.75H10.9642C10.7944 14.2973 10.4564 13.9691 10.0915 13.7825C10.0302 13.7512 9.97058 13.7167 9.91294 13.6792C9.56829 13.4554 9.11402 13.3264 8.63627 13.4059L8.60059 13.3441C8.90769 12.9711 9.02353 12.5144 9.00265 12.1045C9.00089 12.07 9 12.0351 9 12C9 11.9649 9.00089 11.93 9.00265 11.8955C9.02353 11.4856 8.9077 11.0289 8.60061 10.6559L8.63629 10.5941C9.11403 10.6736 9.56829 10.5446 9.91295 10.3208C9.97059 10.2833 10.0302 10.2488 10.0915 10.2175ZM14.4037 11.4079L14.9641 10.866L13.9641 9.13398L13.215 9.34827C13.0629 9.39177 12.9006 9.35863 12.7679 9.27247C12.6743 9.21169 12.5774 9.15559 12.4775 9.1045C12.3369 9.03257 12.2272 8.90865 12.1888 8.75537L12 8H10L9.81116 8.75537C9.77284 8.90865 9.66315 9.03257 9.52247 9.1045C9.42257 9.15558 9.32566 9.21168 9.23208 9.27247C9.09943 9.35862 8.93709 9.39176 8.78502 9.34826L8.03591 9.13397L7.03591 10.866L7.5963 11.4079C7.70977 11.5176 7.7623 11.6743 7.75427 11.8319C7.75143 11.8876 7.75 11.9436 7.75 12C7.75 12.0564 7.75143 12.1124 7.75427 12.168C7.7623 12.3257 7.70977 12.4824 7.5963 12.5921L7.03589 13.134L8.03589 14.866L8.78501 14.6517C8.93708 14.6082 9.09942 14.6414 9.23207 14.7275C9.32566 14.7883 9.42257 14.8444 9.52248 14.8955C9.66315 14.9674 9.77284 15.0913 9.81116 15.2446L10 16H12L12.1888 15.2446C12.2272 15.0913 12.3369 14.9674 12.4775 14.8955C12.5774 14.8444 12.6743 14.7883 12.7679 14.7275C12.9006 14.6414 13.0629 14.6082 13.215 14.6517L13.9641 14.866L14.9641 13.134L14.4037 12.5921C14.2902 12.4824 14.2377 12.3257 14.2457 12.168C14.2486 12.1124 14.25 12.0564 14.25 12C14.25 11.9436 14.2486 11.8876 14.2457 11.832C14.2377 11.6743 14.2902 11.5176 14.4037 11.4079Z", text: "Account" },
            { icon: "M7.70059 1.73618L7.74488 1.5H8.2551L8.29938 1.73618C8.4406 2.48936 8.98357 3.04807 9.63284 3.27226C9.82296 3.33791 10.008 3.41476 10.1871 3.50207C10.805 3.80328 11.5845 3.7922 12.2172 3.35933L12.4158 3.22342L12.7766 3.5842L12.6407 3.78284C12.2078 4.41549 12.1967 5.19496 12.4979 5.81292C12.5852 5.99203 12.6621 6.17703 12.7277 6.36714C12.9519 7.01642 13.5106 7.55938 14.2638 7.7006L14.5 7.74489V8.25511L14.2638 8.2994C13.5106 8.44062 12.9519 8.98359 12.7277 9.63286C12.6621 9.82298 12.5852 10.008 12.4979 10.1871C12.1967 10.805 12.2078 11.5845 12.6407 12.2172L12.7766 12.4158L12.4158 12.7766L12.2172 12.6407C11.5845 12.2078 10.805 12.1967 10.1871 12.4979C10.008 12.5852 9.82296 12.6621 9.63284 12.7277C8.98357 12.9519 8.4406 13.5106 8.29938 14.2638L8.2551 14.5H7.74488L7.70059 14.2638C7.55937 13.5106 7.0164 12.9519 6.36713 12.7277C6.17702 12.6621 5.99202 12.5852 5.8129 12.4979C5.19495 12.1967 4.41548 12.2078 3.78283 12.6407L3.5842 12.7766L3.22342 12.4158L3.35932 12.2172C3.79219 11.5845 3.80326 10.8051 3.50206 10.1871C3.41475 10.008 3.3379 9.82298 3.27225 9.63285C3.04806 8.98358 2.48935 8.44061 1.73616 8.29939L1.5 8.25511V7.74489L1.73616 7.70061C2.48935 7.55939 3.04806 7.01642 3.27225 6.36715C3.3379 6.17703 3.41475 5.99203 3.50205 5.81291C3.80326 5.19496 3.79218 4.41549 3.35931 3.78283L3.2234 3.5842L3.58418 3.22342L3.78282 3.35932C4.41547 3.79219 5.19494 3.80327 5.8129 3.50207C5.99201 3.41476 6.17701 3.33791 6.36713 3.27226C7.0164 3.04807 7.55937 2.48936 7.70059 1.73618ZM6.49999 0H9.49999L9.77369 1.45974C9.80837 1.64472 9.94454 1.79299 10.1224 1.85441C10.3702 1.93996 10.6111 2.04007 10.8443 2.15371C11.0135 2.2362 11.2148 2.22768 11.3701 2.12137L12.5962 1.28249L14.7175 3.40381L13.8786 4.62987C13.7723 4.78525 13.7638 4.98647 13.8463 5.1557C13.9599 5.38885 14.06 5.62981 14.1456 5.87756C14.207 6.05545 14.3553 6.19161 14.5402 6.2263L16 6.5V9.5L14.5402 9.7737C14.3553 9.80839 14.207 9.94455 14.1456 10.1224C14.06 10.3702 13.9599 10.6112 13.8463 10.8443C13.7638 11.0135 13.7723 11.2148 13.8786 11.3701L14.7175 12.5962L12.5962 14.7175L11.3701 13.8786C11.2147 13.7723 11.0135 13.7638 10.8443 13.8463C10.6111 13.9599 10.3702 14.06 10.1224 14.1456C9.94454 14.207 9.80837 14.3553 9.77369 14.5403L9.49999 16H6.49999L6.22628 14.5403C6.1916 14.3553 6.05544 14.207 5.87755 14.1456C5.6298 14.06 5.38884 13.9599 5.15569 13.8463C4.98645 13.7638 4.78523 13.7723 4.62985 13.8786L3.40381 14.7175L1.28249 12.5962L2.12136 11.3702C2.22767 11.2148 2.23619 11.0136 2.1537 10.8443C2.04006 10.6112 1.93995 10.3702 1.8544 10.1224C1.79297 9.94455 1.6447 9.80838 1.45973 9.7737L0 9.5V6.5L1.45973 6.2263C1.6447 6.19162 1.79297 6.05545 1.8544 5.87756C1.93995 5.62981 2.04005 5.38885 2.1537 5.15569C2.23619 4.98646 2.22766 4.78524 2.12135 4.62986L1.28247 3.40381L3.40379 1.28249L4.62984 2.12136C4.78522 2.22767 4.98644 2.2362 5.15568 2.15371C5.38883 2.04007 5.6298 1.93996 5.87755 1.85441C6.05544 1.79299 6.1916 1.64472 6.22628 1.45975L6.49999 0ZM9.49998 8C9.49998 8.82843 8.82841 9.5 7.99998 9.5C7.17156 9.5 6.49998 8.82843 6.49998 8C6.49998 7.17157 7.17156 6.5 7.99998 6.5C8.82841 6.5 9.49998 7.17157 9.49998 8ZM11 8C11 9.65685 9.65684 11 7.99998 11C6.34313 11 4.99998 9.65685 4.99998 8C4.99998 6.34315 6.34313 5 7.99998 5C9.65684 5 11 6.34315 11 8Z", text: "Settings" }
        ];

        return (
            <>
                <div className="first-group-popup">
                    {items.map((item, index) => (
                        <div key={index} className="item-popup disabled">
                            <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "currentcolor" }}>
                                <path fillRule="evenodd" clipRule="evenodd" d={item.icon} fill="currentColor"></path>
                            </svg>
                            <span>{item.text}</span>
                            <div className="badge-soon">
                                <span>SOON</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="item-popup logout disabled">
                    <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "currentcolor" }}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.5 13.5H6.75V15H2C1.44772 15 1 14.5523 1 14V2C1 1.44771 1.44772 1 2 1H6.75V2.5L2.5 2.5L2.5 13.5ZM12.4393 7.24999L10.4697 5.28031L9.93934 4.74998L11 3.68932L11.5303 4.21965L14.6036 7.29288C14.9941 7.6834 14.9941 8.31657 14.6036 8.70709L11.5303 11.7803L11 12.3106L9.93934 11.25L10.4697 10.7197L12.4393 8.74999L5.75 8.74999H5V7.24999H5.75L12.4393 7.24999Z" fill="currentColor"></path>
                    </svg>
                    <span>Logout</span>
                    <div className="badge-soon">
                        <span>SOON</span>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="nav-mobile">
                <div className="logo-mobile">
                    <img src={logo} alt="Logo" />
                </div>
                <div onClick={openSearchModal} className="searchIcon">
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
                        <svg onClick={closeSearchModal} data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "currentcolor" }}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.5 11.5607L6.03033 11.0303L8 9.06066L9.96967 11.0303L10.5 11.5607L11.5607 10.5L11.0303 9.96967L9.06066 8L11.0303 6.03033L11.5607 5.5L10.5 4.43934L9.96967 4.96967L8 6.93934L6.03033 4.96967L5.5 4.43934L4.43934 5.5L4.96967 6.03033L6.93934 8L4.96967 9.96967L4.43934 10.5L5.5 11.5607Z" fill="currentColor"></path>
                        </svg>
                    </div>

                    <div className="results-search">
                        {renderSearchResults()}
                    </div>
                </div>
            </div>

            <div className="main-sidebar">
                <div className="logoTop">
                    <img src={logo} alt="Logo" />
                    <div className="nav-items">
                        <div onClick={openSearchModal} className="search">
                            <button>Search</button>
                            <img src={searchIcon} alt="Search Icon" />
                            <kbd>CTRL + K</kbd>
                        </div>
                        <div className="star-github">
                            <button onClick={() => navigate("/redirect/github")} id="buttonStar">
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

                <div className="userDetails">
                    <div onClick={openPopUp} className="userId" ref={userIdRef}>
                        <div className="pfp">
                            <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "#dfdfd7" }}>
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <div className="group-userId-name">
                            <span>Guest User</span>
                            <p>Free Account</p>
                        </div>
                        <div className="iconSelect">
                            <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "#dfdfd7" }}>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.7071 2.39644C8.31658 2.00592 7.68341 2.00592 7.29289 2.39644L4.46966 5.21966L3.93933 5.74999L4.99999 6.81065L5.53032 6.28032L7.99999 3.81065L10.4697 6.28032L11 6.81065L12.0607 5.74999L11.5303 5.21966L8.7071 2.39644ZM5.53032 9.71966L4.99999 9.18933L3.93933 10.25L4.46966 10.7803L7.29289 13.6035C7.68341 13.9941 8.31658 13.9941 8.7071 13.6035L11.5303 10.7803L12.0607 10.25L11 9.18933L10.4697 9.71966L7.99999 12.1893L5.53032 9.71966Z" fill="currentColor"></path>
                            </svg>
                        </div>
                    </div>

                    <div className="popupSideDetails" ref={popupRef}>
                        <div className="userInfo disabled">
                            <div className="pfp second">
                                <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "#dfdfd7" }}>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <div className="group-userId-name">
                                <span>Guest User</span>
                                <p>Free Account</p>
                            </div>
                        </div>
                        <div className="items-popup disabled">
                            {renderPopupItems()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}