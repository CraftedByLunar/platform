import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import ReactLenis, { useLenis } from "lenis/react";
import Home from "./Site/Homepage/Home";
import Pricing from "./Site/PricingPage/Pricing";
import FAQ from "./Site/FAQ/FAQ";
import TestingSpace from "./Pages/TestingSpace/TestingSpace";

// Lazy load app pages
const StartingPage = lazy(() => import("./Pages/StartingPage/StartingPage"));
const LinkTextPage = lazy(() => import("./Pages/LinkText/LinkTextPage"));
const BotomNavPage = lazy(() => import("./Pages/BottomNav/BottomNavPage"));
const ComicButton = lazy(() => import("./Pages/ComicButton/ComicButton"));
const StaggeredText = lazy(() => import("./Pages/StaggeredText/StaggeredText"));
const TextSlideBtnPage = lazy(() => import("./Pages/TextSlide/TextSlideBtnPage"));
const CursorDraw = lazy(() => import("./Pages/CursorDraw/CursorDraw"));
const MagneticButton = lazy(() => import("./Pages/MagneticButton/MagneticButton"));
const NotFound = lazy(() => import("./Pages/404/404"));
const Terms = lazy(() => import("./Pages/Terms/Terms"));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Check if we're on an app route (no Lenis)
    if (location.pathname.startsWith("/app")) {
      window.scrollTo(0, 0);
    }
    // For non-app routes, Lenis will handle smooth scrolling to top
    // but we still need to trigger it
    else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}

function ExternalRedirect({ url }) {
  useEffect(() => {
    window.open(url, "_blank")
  }, [url]);

  setTimeout(() => {
    window.location.pathname = "/app"
  }, 100)
}

function ConditionalLenisWrapper({ children }) {
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith("/app");

  if (isAppRoute) {
    return children;
  }

  return (
    <ReactLenis root options={{ touchSync: true }}>
      {children}
    </ReactLenis>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ConditionalLenisWrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Landing Pages */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} /> */}

            {/* Typo Redirect */}
            <Route path="/intro" element={<Navigate to="/app/intro" />} />

            {/* App pages with Layout no lenis*/}
            <Route path="/app" element={<Layout />}>
              <Route index element={<Navigate to="/app/intro" />} />
              <Route path="intro" element={<StartingPage />} />
              <Route path="link-text" element={<LinkTextPage />} />
              <Route path="bottom-nav" element={<BotomNavPage />} />
              <Route path="comic-button" element={<ComicButton />} />
              <Route path="stagger-text" element={<StaggeredText />} />
              <Route path="magnetic-button" element={<MagneticButton />} />
              <Route path="text-slide-btn" element={<TextSlideBtnPage />} />
              <Route path="cursor-draw" element={<CursorDraw />} />
              <Route path="terms" element={<Terms />} />
              <Route path="testing-space" element={<TestingSpace />} />
            </Route>

            {/* external redirects */}
            <Route path="/redirect" element={<Layout />}>
              <Route
                path="github"
                element={
                  <ExternalRedirect url="https://github.com/CraftedByLunar/platform" />
                }
              />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ConditionalLenisWrapper>
    </BrowserRouter>
  );
}

export default App;