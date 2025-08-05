import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import "./Navbar.css";
import Logo from "../../../assets/Logos/logoSvg.svg";
import { Link } from "react-router-dom";
import ButtonAnimated from "../ButtonAnimated/ButtonAnimated";
import LinkText from "../../../Components/LunarComponents/LinkText/LinkText"

gsap.registerPlugin(CustomEase)

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleMenuClick = () => {
        setIsMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const navbar = document.querySelector(".main-navbar");

        const handleScroll = () => {
            if (window.scrollY > 0) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {


        CustomEase.create("smoothEase", "0.87, 0, 0.13, 1")
        if (isMenuOpen) {
            gsap.fromTo(menuRef.current,
                { clipPath: "inset(0 0 100% 0)" },
                {
                    clipPath: "inset(0 0 0% 0)",
                    duration: 0.5,
                    ease: "smoothEase",
                    pointerEvents: "auto"
                }
            );
        } else {
            gsap.to(menuRef.current, {
                clipPath: "inset(0 0 100% 0)",
                duration: 0.5,
                ease: "smoothEase",
                pointerEvents: "none"
            });
        }
    }, [isMenuOpen]);

    return (
        <>
            <div ref={menuRef} className="menu-nav">
                <div className="wrap1">
                    {/* <Link to="/">Home</Link>
                    <Link to="/pricing">Pricing</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/components">Browse Components</Link> */}
                    <ButtonAnimated onClick={() => { window.location.replace("/app") }} background="#FFFB00" textColor={"black"} borderColor={"black"} text="Jump to Docs →" />
                </div>
            </div>

            <div className="main-navbar">
                <div className="navbar">
                    <div className="logoLeft">
                        <Link to={"/"}><img src={Logo} alt="Logo" /></Link>
                    </div>

                    <div className="group1-nav">
                        <ButtonAnimated onClick={() => { window.location.replace("/app") }} text="Get Started" borderColor={"black"} textColor={"black"} background="#FFFB00" />
                        <div onClick={handleMenuClick} className="button-menu">
                            <div className={isMenuOpen ? "line1 active" : "line1"}></div>
                            <div className={isMenuOpen ? "line2 active" : "line2"}></div>
                        </div>
                    </div>

                    <div className="navigation">
                        {/* <LinkText text="Home" to="/"></LinkText>
                        <LinkText text="Pricing" to="/pricing"></LinkText>
                        <LinkText text="Browse Components" to="/components"></LinkText>
                        <LinkText text="FAQ" to="/faq"></LinkText> */}
                        <ButtonAnimated onClick={() => { window.location.replace("/app") }} borderColor={"black"} textColor={"black"} text="Get Started" background="#FFFB00" />
                    </div>
                </div>
            </div >
        </>
    );
}
