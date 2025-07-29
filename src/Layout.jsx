import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./PageTransitionWrapper.css";

function Layout() {
  const [docsWidth, setDocsWidth] = useState("100%");
  const [showContent, setShowContent] = useState(true);
  const [nextPath, setNextPath] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // listen for pathname change and intercept it
  useEffect(() => {
    const unlisten = () => {
      const links = document.querySelectorAll("a[href]");
      links.forEach(link => {
        const href = link.getAttribute("href");
        if (href?.startsWith("/app") && href !== location.pathname) {
          link.addEventListener("click", e => {
            e.preventDefault();
            setShowContent(false);
            setNextPath(href);
          });
        }
      });
    };

    unlisten(); 
    return () => {};
  }, [location.pathname]);

  useEffect(() => {
    if (!showContent && nextPath) {
      const timeout = setTimeout(() => {
        navigate(nextPath);
        setShowContent(true);
        setNextPath(null);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [showContent, nextPath, navigate]);

  useEffect(() => {
    const updateWidth = () => {
      const sidebar = document.querySelector(".main-sidebar");
      if (sidebar) {
        const sidebarWidth = sidebar.offsetWidth;
        if (window.innerWidth > 958) {
          setDocsWidth(`calc(100% - ${sidebarWidth}px)`);
        } else {
          setDocsWidth("100%");
        }
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="main-app-container">
      <div className="app-container">
        <Sidebar />
        <div
          className={`main-docs ${showContent ? "fade-in" : "fade-out"}`}
          style={{ width: docsWidth }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
