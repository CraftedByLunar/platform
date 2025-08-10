import React from "react";
import "./TestingSpace.css";
import ComicButton from "../../Components/LunarComponents/3DComicButton/3DComicButton";
import TextStagger from "../../Components/LunarComponents/TextStagger/TextStagger";
import TextSlideButton from "../../Components/LunarComponents/TextSlideButton/TextSlideButton";
import MagneticButton from "../../Components/LunarComponents/MagneticButton/MagneticButton";
import CursorDraw from "../../Components/LunarComponents/CursorDraw/CursorDraw";
import OpacityTextReveal from "../../Components/LunarComponents/OpacityTextReveal/OpacityTextReveal";
import TextScramble from "../../Components/LunarComponents/TextScramble/TextScramble";
import MagneticText from "../../Components/LunarComponents/MagneticText/MagneticText";
import BouncyButton from "../../Components/LunarComponents/BouncyButton/BouncyButton";
import ImageTrail from "../../Components/LunarComponents/ImageTrail/ImageTrail";
import InfiniteDraggableGrid from "./DraggableComp";
import RippleButton from "../../Components/LunarComponents/RippleButton/RippleButton";
import TwoDPhysics from "../../Components/LunarComponents/2DPhysics/2DPhysics";
import BackgroundDots from "../../Components/LunarComponents/DotsBackground/DotsBackground";
import { addScaleCorrector } from "framer-motion";

export default function TestingSpace() {
  const images = [
    "https://cdn.pixabay.com/photo/2018/04/14/23/21/cute-3320456_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/11/05/19/01/cappadocia-6771879_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/12/13/22/29/young-woman-8447841_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/05/05/12/57/flowers-7176104_640.jpg",
    "https://cdn.pixabay.com/photo/2022/10/22/17/00/gull-7539615_1280.jpg",
  ];

  return (
    <div className="main-testing-space">
      <div className="conta">
        <BackgroundDots></BackgroundDots>
      </div>
    </div>
  );
}
