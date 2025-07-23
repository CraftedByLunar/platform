import "./StartingPage.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function StartingPage() {
    return (
        <div className="main-start-page">
            <div className="start-page">
                {/* code this shit dude more like the clerk.dev start page */}
                <h1>Hello there, This page is currently being rebuilt, Thanks!</h1>
                <span>In the meantime, try some awesome components!</span>
                <div className="links-temp">
                    <Link to="/app/image-trail">Cursor Following Image Trail</Link>
                    <Link to="/app/cursor-draw">Cursor Draw</Link>
                    <Link to="/app/magnetic-button">Magnetic Button</Link>
                    <Link to="/app/bottom-nav">Bottom Bar</Link>
                </div>
                <div className="footer-docs full" style={{ height: "100px" }}>
                    <p>
                        Proudly created with 💖 by <a href="https://codedbymohit.xyz">Mohit Tiwari</a>
                    </p>
                    <div className="links-docs">
                        <Link to="/terms">Terms & Conditions</Link>
                        <Link to="/github">Github</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}