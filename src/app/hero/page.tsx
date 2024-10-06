"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text3D } from "@react-three/drei";

import {
	FloatingNode,
	Sidebar,
	RisingStar,
	ShootingStar,
} from "@/components/my-hero";

// Main Scene
const MyHero = () => {
	// Example nodes
	const nodes = [
		{ id: "Cloud", position: [1, 1, 0] },
		{ id: "Database", position: [-1, -1, 0] },
		{ id: "Linux", position: [-1, 1, 1] },
		{ id: "Code", position: [1, -1, -1] },
	];

	return (
		<div className="h-screen w-screen">
			<Canvas>
				{/* Background stars */}
				<Stars />

				{/* Lighting */}
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} />

				{/* 3D Text on the left side */}
				<Text3D
					font="/fonts/helvetiker_regular.typeface.json"
					size={0.5}
					position={[-2.5, 1, 0]}>
					My Name
					<meshStandardMaterial color="white" />
				</Text3D>

				<Text3D
					font="/fonts/helvetiker_regular.typeface.json"
					size={0.2}
					position={[-2.5, 0, 0]}>
					Aspiring Tech Star
					<meshStandardMaterial color="white" />
				</Text3D>

				{/* Floating nodes and network on the right */}
				{nodes.map((node, index) => (
					<FloatingNode
						key={index}
						position={
							node.position.length === 3
								? (node.position as [number, number, number])
								: [0, 0, 0]
						}
						name={node.id}
						onClick={() => alert(node.id)}
					/>
				))}

				{/* Orbit Controls for pan, zoom, and rotate */}
				<OrbitControls
					enableZoom={true}
					enablePan={true}
					enableRotate={true}
				/>

				{/* Sidebar */}
				<Sidebar />

				{/* Rising Star */}
				<RisingStar />

				{/* Shooting Star */}
				<ShootingStar />
			</Canvas>
		</div>
	);
};

export default MyHero;
