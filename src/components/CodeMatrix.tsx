"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Instances, Instance, Stars, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface CodeSnippetsProps {
	textArray: string[];
}

function CodeSnippets({ textArray }: CodeSnippetsProps) {
	const snippets = useRef<THREE.InstancedMesh>(null!);

	useFrame(() => {
		if (!snippets.current) return; // Ensure ref is set before accessing

		// Loop through each instance and update its position
		for (let i = 0; i < textArray.length; i++) {
			const dummyMatrix = new THREE.Matrix4();
			snippets.current.getMatrixAt(i, dummyMatrix);

			const position = new THREE.Vector3();
			dummyMatrix.decompose(
				position,
				new THREE.Quaternion(),
				new THREE.Vector3()
			);

			position.z -= 0.05; // Move forward

			if (position.z < -50) {
				position.z = 50; // Reset if out of bounds
			}

			dummyMatrix.setPosition(position);
			snippets.current.setMatrixAt(i, dummyMatrix);
		}

		snippets.current.instanceMatrix.needsUpdate = true; // Notify the system to update the instance matrix
	});

	return (
		<Instances ref={snippets} limit={textArray.length}>
			<boxGeometry attach="geometry" args={[1, 1, 0.1]} />{" "}
			{/* Attach geometry to all instances */}
			<meshStandardMaterial
				attach="material"
				emissive="green"
				emissiveIntensity={0.6}
			/>{" "}
			{/* Attach material */}
			{textArray.map((text, i) => (
				<Instance
					key={i}
					scale={[
						Math.random() * 0.5 + 1,
						Math.random() * 0.5 + 1,
						1,
					]} // Randomize size
					position={[
						Math.random() * 10 - 5,
						Math.random() * 10 - 5,
						Math.random() * 100 - 50,
					]} // Random position
				/>
			))}
		</Instances>
	);
}

export default function CodeMatrix() {
	const codeSnippets: string[] = [
		"const sum = (a, b) => a + b;",
		'fetch("/api/data")',
		"function compile() { ... }",
		'console.log("Hello World!");',
	];

	return (
		<Canvas>
			<Stars />
			<OrbitControls enableZoom enablePan enableRotate />
			<ambientLight intensity={0.5} />
			<CodeSnippets textArray={codeSnippets} />
		</Canvas>
	);
}
