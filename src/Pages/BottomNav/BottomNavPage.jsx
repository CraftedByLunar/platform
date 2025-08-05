import "./BottomNavPage.css";
import React, { useState, useEffect, useCallback } from "react";
import MDConverter from "../../Components/MDConverter/MDConverter";
import ComponentPreview from "../../Components/ComponentPreview/ComponentPreview";
import BottomNav from "../../Components/LunarComponents/BottomNavButton/BottomNav";

export default function StartingPage() {
    const [markdownContent, setMarkdownContent] = useState("");
    const items = ["Home", "About", "Contact", "Work"];

    const loadMarkdown = useCallback((path) => {
        fetch(path)
            .then((res) => res.text())
            .then(setMarkdownContent)
            .catch((err) => console.error("Error loading markdown:", err));
    }, []);

    useEffect(() => {
        loadMarkdown("/BottomBar/React/BottomBar.md");
    }, [loadMarkdown]);

    const handleLanguageChange = (version) => {
        if (version === "react") {
            loadMarkdown("/BottomBar/React/BottomBar.md");
        } else if (version === "html") {
            loadMarkdown("/BottomBar/Vanilla/BottomBarVanilla.md");
        }
    };

    return (
        <div className="main-bottombar-page">
            <div className="bottombar-page">
                <ComponentPreview
                    component={BottomNav}
                    componentProps={{ items }}
                    title="Bottom Nav"
                    stack="gsap"
                    onLanguageChange={handleLanguageChange}
                />
                <hr />
                <MDConverter markdown={markdownContent} />
            </div>
        </div>
    );
}
