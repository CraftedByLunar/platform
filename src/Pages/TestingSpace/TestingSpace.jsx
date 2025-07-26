import React from "react"
import "./TestingSpace.css"
import ComicButton from "../../Components/3DComicButton"
import TextStagger from "../../Components/TextStagger"
import TextSlideButton from "../../Components/TextSlideButton"
import MagneticButton from "../../Components/MagneticButton"
import CursorDraw from "../../Components/CursorDraw"
import OpacityTextReveal from "../../Components/OpacityTextReveal"
import TextScramble from "../../Components/TextScramble"
import MageneticText from "../../Components/MagneticText"
import BouncyButton from "../../Components/BouncyButton"
import ImageTrail from "../../Components/ImageTrail"
import InfiniteDraggableGrid from "./DraggableComp"


export default function TestingSpace() {
    const images = ["https://cdn.pixabay.com/photo/2018/04/14/23/21/cute-3320456_960_720.jpg", "https://cdn.pixabay.com/photo/2021/11/05/19/01/cappadocia-6771879_1280.jpg", "https://cdn.pixabay.com/photo/2023/12/13/22/29/young-woman-8447841_1280.jpg", "https://cdn.pixabay.com/photo/2022/05/05/12/57/flowers-7176104_640.jpg", "https://cdn.pixabay.com/photo/2022/10/22/17/00/gull-7539615_1280.jpg"]


    return (
        <div className="main-testing-space">
            <InfiniteDraggableGrid images={images}></InfiniteDraggableGrid>
        </div >
    )
}