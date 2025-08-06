import React, { useEffect, useRef } from "react";
import "./FirstSection.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ButtonAnimated from "../../../Components/ButtonAnimated/ButtonAnimated";

gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText);

function fixMask({ elements, masks }, baseLineHeight = 1.3) {
    const [firstElement] = elements;
    const lineHeight = parseFloat(
        gsap.getProperty(firstElement, "line-height", "em")
    );
    const lineHeightDifference = lineHeight - baseLineHeight;

    masks.forEach((mask, i) => {
        const isFirst = i === 0;
        const isLast = i === masks.length - 1;

        gsap.set(mask, {
            lineHeight: baseLineHeight,
            marginTop: isFirst ? `${0.6 * lineHeightDifference}em` : "0",
            marginBottom: isLast
                ? "0em"
                : `${lineHeightDifference}em`,
        });
    });
}

export default function FirstSection() {
    const containerRef = useRef(null);
    const split1Ref = useRef(null);
    const split2Ref = useRef(null);

    const runAnimations = () => {
        gsap.killTweensOf(".text__main h1, .text__bottom span");
        gsap.killTweensOf(".wordFirstMain, .wordSecondMain");

        if (split1Ref.current) split1Ref.current.revert();
        if (split2Ref.current) split2Ref.current.revert();

        split1Ref.current = new SplitText(".text__main h1", {
            type: "lines",
            mask: "lines",
            linesClass: "wordFirstMain",
        });

        split2Ref.current = new SplitText(".text__bottom span", {
            type: "lines",
            mask: "lines",
            linesClass: "wordSecondMain",
        });

        fixMask(split1Ref.current);
        fixMask(split2Ref.current);

        gsap.fromTo(
            ".wordFirstMain",
            { y: "100%" },
            {
                y: "0",
                ease: "smoothEase",
                stagger: 0.04,
                duration: 1.4,
            }
        );

        gsap.fromTo(
            ".wordSecondMain",
            { y: "100%" },
            {
                y: "0",
                ease: "smoothEase",
                stagger: { amount: 0.2, from: "left" },
                duration: 1.4,
                delay: 0.5,
            }
        );

        gsap.fromTo(
            ".comp__prev, .comp",
            { y: "100%", opacity: 0 },
            {
                y: "0",
                opacity: 1,
                ease: "smoothEase",
                stagger: { amount: 0.2, from: "left" },
                duration: 1.4,
                delay: 1.6,
            }
        );

        gsap.fromTo(
            ".btns__main button",
            { opacity: 0 },
            {
                opacity: 1,
                stagger: { amount: 0.2, from: "left" },
                duration: 0.9,
                delay: 2,
            }
        );
    };

    useEffect(() => {
        CustomEase.create("smoothEase", "0.87, 0, 0.13, 1");

        runAnimations();

        const prevWidthRef = { current: window.innerWidth };

        const handleResize = () => {
            const newWidth = window.innerWidth;
            if (newWidth !== prevWidthRef.current) {
                prevWidthRef.current = newWidth;
                runAnimations();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (split1Ref.current) split1Ref.current.revert();
            if (split2Ref.current) split2Ref.current.revert();
        };
    }, []);


    useEffect(() => {
        const isMobileOrTablet = window.innerWidth <= 1024;
        const container = containerRef.current;
        const comps = container?.querySelectorAll(".comp");

        comps?.forEach((comp) => {
            const video = comp.querySelector("video");
            if (!video) return;

            if (isMobileOrTablet) {
                video.pause();
                video.currentTime = 0;
                video.removeAttribute("autoplay");
                video.removeAttribute("muted");
                video.removeAttribute("playsinline");
                video.controls = false;
            } else {
                const play = () => video.play();
                const pause = () => {
                    video.currentTime = 0;
                    video.pause();
                };

                comp.addEventListener("mouseenter", play);
                comp.addEventListener("mouseleave", pause);

                return () => {
                    comp.removeEventListener("mouseenter", play);
                    comp.removeEventListener("mouseleave", pause);
                };
            }
        });
    }, []);

    return (
        <div className="main-first-section">
            <div className="firstSection">
                <div className="text__main">
                    <h1>Create websites that inspires, at blazing fast speed.</h1>
                    <div className="text__bottom">
                        <span>
                            Lunar gives you ready-to-use components paired with
                            step-by-step tutorials — all open-source, completely
                            free, and designed to help you build with confidence.
                        </span>
                        
                        {/* <span id="notice-txt">Please keep in mind that Lunar is currently only available for Hackclubbers. If you want to know when this launches publicly, you can join the waitlist <a href="https://bylunar.dev">here.</a> </span> */}
                    </div>

                    <div className="btns__main">
                        <ButtonAnimated
                            onClick={() => { window.location.replace("/app") }}
                            text="Explore Docs →"
                            background="#FFFB00"
                            textColor={"black"}
                            borderColor="black"
                        />
                        <ButtonAnimated
                            onClick={() => { window.location.replace("/app") }}
                            text="Browse Components →"
                            background="black"
                            textColor="white"
                            borderColor="black"
                        />
                    </div>
                </div>

                <div className="comp__prev" ref={containerRef}>
                    <div className="wrapppp">
                        {[
                            {
                                text: "Bottom Nav Bar",
                                poster:
                                    "https://res.cloudinary.com/daqmqnfju/image/upload/v1748845851/Screenshot_2025-06-02_115500_vohdy2.png",
                                src:
                                    "https://res.cloudinary.com/daqmqnfju/video/upload/v1748844305/Screen_Recording_2025-05-30_133717_video-converter.com_dcv7lu.mp4",
                            },
                            {
                                text: "Link Text",
                                poster:
                                    "https://res.cloudinary.com/daqmqnfju/image/upload/v1748845851/Screenshot_2025-06-02_115533_lybrlc.png",
                                src:
                                    "https://res.cloudinary.com/daqmqnfju/video/upload/v1748844305/Screen_Recording_2025-05-30_140651_video-converter.com_nohfqm.mp4",
                            },
                            {
                                text: "Comic Button",
                                poster:
                                    "https://res.cloudinary.com/daqmqnfju/image/upload/v1748845851/Screenshot_2025-06-02_115607_oqt54n.png",
                                src:
                                    "https://res.cloudinary.com/daqmqnfju/video/upload/v1748844305/Screen_Recording_2025-05-30_142018_video-converter.com_gq9hjc.mp4",
                            },
                            {
                                text: "Staggered Text",
                                poster:
                                    "https://res.cloudinary.com/daqmqnfju/image/upload/v1748845852/Screenshot_2025-06-02_115717_qrxbbz.png",
                                src:
                                    "https://res.cloudinary.com/daqmqnfju/video/upload/v1748844305/staggeredTextVidDemo_video-converter.com_symtwb.mp4",
                            },
                        ].map((comp, index) => (
                            <div className="comp" key={index}>
                                <div className="vid">
                                    <video
                                        poster={comp.poster}
                                        src={comp.src}
                                        muted
                                        playsInline
                                    />
                                </div>
                                <CompDetails text={comp.text} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CompDetails({ text }) {
    return (
        <div className="details-btn">
            <div className="dtl-txt">
                <span>{text}</span>
            </div>
            <div className="btn-go">
                <button>
                    <svg
                        height="12"
                        width="12"
                        viewBox="0 0 16 16"
                        style={{ color: "white" }}
                        strokeLinejoin="round"
                    >
                        <path
                            fill="currentColor"
                            d="M5.5 1.94l.53.53 4.82 4.82a1 1 0 010 1.41L6.03 13.53l-.53.53L4.47 13l4.82-4.82L4.47 3.35l1.03-1.41z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
