"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "@/components/experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const R3fLandingPage = () => {
	return (
		<Canvas
			style={{
				height: "100vh",
				width: "100vw",
				justifyContent: "center",
				alignItems: "center",
			}}
			shadows
			camera={{ position: [0, 0, 8], fov: 42 }}>
			<color attach="background" args={["#171720"]} />
			<fog attach="fog" args={["#171720", 10, 30]} />
			<Experience />
			<EffectComposer>
				<Bloom mipmapBlur intensity={1.2} />
			</EffectComposer>
		</Canvas>
	);
};

export default R3fLandingPage;
