import * as THREE from "three";
import {
	CameraControls,
	Environment,
	Float,
	MeshReflectorMaterial,
	RenderTexture,
	Text,
	useFont,
} from "@react-three/drei";
import { Fragment, useEffect, useRef } from "react";
import { Camping } from "./Camping";
import { degToRad } from "three/src/math/MathUtils.js";

const bloomColor = new THREE.Color("#fff");
bloomColor.multiplyScalar(1.5);

const Experience = () => {
	const controls = useRef<CameraControls>(null);
	const meshFitHomeCamera = useRef<THREE.Mesh>(null);

	const intro = async () => {
		controls.current?.dolly(-22);
		if (controls.current) controls.current.smoothTime = 1.8;
		fitCamera();
	};

	const fitCamera = async () => {
		if (meshFitHomeCamera.current)
			controls.current?.fitToBox(meshFitHomeCamera.current, true);
	};

	useEffect(() => {
		intro();
		window.addEventListener("resize", fitCamera);
		return () => window.removeEventListener("resize", fitCamera);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<CameraControls ref={controls} />
			<mesh ref={meshFitHomeCamera} position-z={1.5} visible={false}>
				<boxGeometry args={[7.5, 2, 2]} />
				<meshBasicMaterial color={"orange"} transparent opacity={0.5} />
			</mesh>
			<Text
				font="fonts/Poppins-Black.ttf"
				position={[-1.3, -0.5, 1]}
				lineHeight={0.8}
				textAlign="center"
				rotation-y={degToRad(30)}
				anchorY={"bottom"}>
				MY NAME IS{"\n"}MUNARAY
				<meshBasicMaterial color={bloomColor} toneMapped={false}>
					<RenderTexture attach="map">
						<color attach="background" args={["#fff"]} />
						<Environment preset="sunset" />
						<Float floatIntensity={4} rotationIntensity={5}>
							<Camping
								scale={2}
								rotation-y={degToRad(30)}
								rotation-x={degToRad(40)}
								position-x={-0.5}
							/>
						</Float>
					</RenderTexture>
				</meshBasicMaterial>
			</Text>
			<group rotation-y={degToRad(-25)} position-x={3}>
				<Camping scale={0.6} />
			</group>
			<mesh position-y={-0.48} rotation={new THREE.Euler(-Math.PI / 2)}>
				<planeGeometry args={[100, 100]} />
				<MeshReflectorMaterial
					blur={[100, 100]}
					resolution={2048}
					mixBlur={1}
					mixStrength={10}
					roughness={1}
					depthScale={1}
					opacity={0.5}
					transparent
					minDepthThreshold={0.4}
					maxDepthThreshold={1.4}
					color={"#333"}
					metalness={0.5}
					mirror={0.5}
				/>
			</mesh>
			<Environment preset="sunset" />
		</Fragment>
	);
};

useFont.preload("fonts/Poppins-Black.ttf");

export default Experience;
