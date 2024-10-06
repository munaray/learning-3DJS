"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import Link from "next/link";

// Sidebar using Html component from drei
export const Sidebar = () => (
	<Html position={[-3, 0, 0]}>
		<div className="fixed left-0 top-0 h-full w-16 bg-gray-800 flex flex-col items-center space-y-4 p-4">
			<Link href="#home" className="text-white">
				Home
			</Link>
			<Link href="#about" className="text-white">
				About
			</Link>
			<Link href="#projects" className="text-white">
				Projects
			</Link>
			<Link href="#contact" className="text-white">
				Contact
			</Link>
		</div>
	</Html>
);

export const RisingStar = () => {
	const starRef = useRef<THREE.Mesh>(null);
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		if (starRef.current) {
			starRef.current.position.y += Math.sin(time) * 0.01; // Rising animation
		}
	});

	return (
		<mesh ref={starRef} position={[0, -1, -3]}>
			<sphereGeometry args={[0.1, 32, 32]} />
			<meshStandardMaterial emissive="yellow" emissiveIntensity={1} />
		</mesh>
	);
};

export const ShootingStar = () => {
	const starRef = useRef<THREE.Mesh>(null);
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		if (starRef.current) {
			starRef.current.position.x = Math.sin(time) * 10;
			starRef.current.position.y = Math.cos(time) * 5;
			starRef.current.position.z = Math.sin(time * 0.5) * -10;
		}
	});

	return (
		<mesh ref={starRef} position={[0, 5, -5]}>
			<sphereGeometry args={[0.05, 32, 32]} />
			<meshStandardMaterial emissive="white" emissiveIntensity={2} />
		</mesh>
	);
};

interface FloatingNodeProps {
	position: [number, number, number];
	name: string;
	onClick: () => void;
}
// Floating Node with Animation
export const FloatingNode = ({ position, onClick }: FloatingNodeProps) => {
	const meshRef = useRef<THREE.Mesh>(null);
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		if (meshRef.current) {
			meshRef.current.position.y += Math.sin(time + position[0]) * 0.005; // Float effect
		}
	});

	return (
		<mesh ref={meshRef} position={position} onClick={onClick}>
			<sphereGeometry args={[0.2, 32, 32]} />
			<meshStandardMaterial color={"#00ffff"} />
		</mesh>
	);
};
