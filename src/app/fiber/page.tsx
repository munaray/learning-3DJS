"use client";

import * as THREE from "three";
import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Fiber = () => {
	const RotatingCube = () => {
		const meshRef = useRef<THREE.Mesh>(null);

		useFrame(() => {
			if (meshRef.current) {
				meshRef.current.rotation.y += 0.01;
				meshRef.current.rotation.x += 0.01;
			}
		});

		return (
			<mesh ref={meshRef}>
				<cylinderGeometry args={[1, 1, 1]} />
				<meshLambertMaterial color="#468585" emissive="#468585" />

				<Sparkles
					count={100}
					scale={1}
					size={6}
					speed={0.002}
					noise={0.2}
					color="orange"
				/>
			</mesh>
		);
	};

	return (
		<Canvas
			style={{
				height: "100vh",
				width: "100vw",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<OrbitControls enableZoom enablePan enableRotate />
			<directionalLight
				position={[1, 1, 1]}
				intensity={10}
				color={0x9cdba6}
			/>
			<color attach="background" args={["#F0F0F0"]} />

			<RotatingCube />
		</Canvas>
	);
};

export default Fiber;
