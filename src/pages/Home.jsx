import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import sakura from "../assets/sakura.mp3";
import HomeInfo from "../components/HomeInfo";
import Loader from "../components/Loader";
import AmongUs from "../models/AmongUs";
import Bird from "../models/Bird";
import FloatingLand from "../models/FloatingLand";
import HumBird from "../models/HumBird";
import { Island } from "../models/Island";
import Plane from "../models/Plane";
import Sky from "../models/Sky";

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth > 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [0.4, 0.4, 0.4];
    }
    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth > 768) {
      screenScale = [1, 1, 1];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [0.5, 0.5, 0.5];
      screenPosition = [0, -1, -1];
    }
    return [screenScale, screenPosition];
  };

  const adjustLuffyForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth > 768) {
      screenScale = [0.2, 0.2, 0.2];
      screenPosition = [-1, -1.7, -0.2];
    } else {
      screenScale = [0.3, 0.3, 0.3];
      screenPosition = [-1.5, -3.7, -14];
    }
    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  const [luffyScale, luffyPosition] = adjustLuffyForScreenSize();

  useEffect(() => {
    audioRef.current.play();
  }, []);

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Bird />
          <Sky isRotating={isRotating} />
          <HumBird />
          <Island
            position={islandPosition}
            rotation={islandRotation}
            scale={islandScale}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <AmongUs
            isRotating={isRotating}
            scale={luffyScale}
            position={luffyPosition}
            rotation={[0, 20, 0]}
            currentStage={currentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
