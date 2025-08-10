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
const ScrambleText = lazy(() => import("./Pages/ScrambleText/ScrambleText"));
const BotomNavPage = lazy(() => import("./Pages/BottomNav/BottomNavPage"));
const ComicButton = lazy(() => import("./Pages/ComicButton/ComicButton"));
const StaggeredText = lazy(() => import("./Pages/StaggeredText/StaggeredText"));
const DotsBackground = lazy(() =>
  import("./Pages/DotsBackground/DotsBackground")
);
const Two2Physics = lazy(() => import("./Pages/2dPhysics/2DPhysicsPage"));
const TextSlideBtnPage = lazy(() =>
  import("./Pages/TextSlide/TextSlideBtnPage")
);
const CursorDraw = lazy(() => import("./Pages/CursorDraw/CursorDraw"));
const OpacityTextReveal = lazy(() =>
  import("./Pages/OpacityTextReveal/OpacityTextReveal")
);
const MagneticButton = lazy(() =>
  import("./Pages/MagneticButton/MagneticButton")
);
const RippleButton = lazy(() => import("./Pages/RippleButton/RippleButton"));
const BouncyButton = lazy(() => import("./Pages/BouncyButton/BouncyButton"));
const MagneticText = lazy(() => import("./Pages/MagneticText/MagneticText"));
const ImageTrail = lazy(() => import("./Pages/ImageTrail/ImageTrail"));
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
    window.open(url, "_blank");
  }, [url]);

  setTimeout(() => {
    window.location.pathname = "/app";
  }, 100);
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
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Typo Redirect */}
            <Route path="/intro" element={<Navigate to="/app/intro" />} />
            <Route path="/terms" element={<Navigate to="app/terms" />} />

            {/* App pages with Layout no lenis*/}
            <Route path="/app" element={<Layout />}>
              <Route index element={<Navigate to="/app/link-text" />} />
              <Route path="intro" element={<StartingPage />} />
              <Route path="link-text" element={<LinkTextPage />} />
              <Route path="bottom-nav" element={<BotomNavPage />} />
              <Route path="comic-button" element={<ComicButton />} />
              <Route path="stagger-text" element={<StaggeredText />} />
              <Route path="magnetic-button" element={<MagneticButton />} />
              <Route path="bouncy-button" element={<BouncyButton />} />
              <Route path="magnetic-text" element={<MagneticText />} />
              <Route path="scramble-text" element={<ScrambleText />} />
              <Route path="image-trail" element={<ImageTrail />} />
              <Route path="dots-background" element={<DotsBackground />} />
              <Route path="text-slide-btn" element={<TextSlideBtnPage />} />
              <Route path="ripple-btn" element={<RippleButton />} />
              <Route
                path="opacity-text-reveal"
                element={<OpacityTextReveal />}
              />
              <Route path="cursor-draw" element={<CursorDraw />} />
              <Route path="two-d-physics" element={<Two2Physics />} />
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
