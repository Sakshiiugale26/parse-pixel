import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobile = innerWidth < 768;
const ease = (t) => 1 - Math.pow(1 - t, 3);
const shell = (r) => {
  const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
  return [r * s * Math.cos(a), r * u, r * s * Math.sin(a)];
};

function Core() {
  const tilt = useRef(), spin = useRef(), cloud = useRef(), light = useRef(), core = useRef(), ring1 = useRef(), ring2 = useRef(), done = useRef(reduced);
  const N = mobile ? 700 : 2400;

  // particles: start scattered, assemble into a shell around the lattice
  const d = useMemo(() => {
    const from = new Float32Array(N * 3), to = new Float32Array(N * 3), col = new Float32Array(N * 3), pos = new Float32Array(N * 3);
    const pal = ["#22d3ee", "#3b82f6", "#8b5cf6", "#d946ef"].map((c) => new THREE.Color(c));
    for (let i = 0; i < N; i++) {
      from.set(shell(8 + Math.random() * 7), i * 3);
      to.set(shell(1.7 + Math.random() * 1.5), i * 3);
      const c = pal[Math.floor(Math.pow(Math.random(), 1.6) * pal.length)];
      col.set([c.r, c.g, c.b], i * 3);
    }
    pos.set(reduced ? to : from);
    return { from, to, col, pos };
  }, [N]);

  const bits = useMemo(() => (mobile ? [] : Array.from({ length: 14 }, () => shell(2.9 + Math.random() * 0.8))), []);
  const ico = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), []);
  const nodes = useMemo(() => {
    const a = ico.attributes.position, m = new Map();
    for (let i = 0; i < a.count; i++) {
      const v = [a.getX(i), a.getY(i), a.getZ(i)];
      m.set(v.map((n) => n.toFixed(2)).join(), v);
    }
    return [...m.values()];
  }, [ico]);
  const lines = useMemo(() => {
    const arr = [];
    nodes.forEach((v, i) => { if (i % 2 === 0) arr.push(...v, ...v.map((n) => n * (1.9 + Math.random() * 0.6))); });
    return new Float32Array(arr);
  }, [nodes]);

  useFrame((s, dt) => {
    if (!done.current) {
      const e = Math.min(1, Math.max(0, (s.clock.elapsedTime - 0.2) / 1.8)), k = ease(e);
      for (let i = 0; i < d.pos.length; i++) d.pos[i] = d.from[i] + (d.to[i] - d.from[i]) * k;
      cloud.current.geometry.attributes.position.needsUpdate = true;
      if (e >= 1) done.current = true;
    }
    const { x, y } = s.pointer;
    tilt.current.rotation.x += (-y * 0.35 - tilt.current.rotation.x) * 0.05;
    tilt.current.rotation.y += (x * 0.5 - tilt.current.rotation.y) * 0.05;
    spin.current.rotation.y += dt * 0.15;
    cloud.current.rotation.y -= dt * 0.04;
    light.current.position.set(x * 5, y * 4, 4);
    const away = Math.min(1, window.scrollY / innerHeight); // dissolve as the hero scrolls out
    cloud.current.material.opacity = 0.85 * (1 - away);
    cloud.current.scale.setScalar(1 + away * 1.5);
    tilt.current.position.z = -away * 2.5; // subtle depth on scroll
    const pulse = Math.sin(s.clock.elapsedTime * 1.6);
    core.current.scale.setScalar(1 + pulse * 0.06);
    core.current.material.emissiveIntensity = 1.1 + pulse * 0.35;
    ring1.current.rotation.z += dt * 0.4;
    ring2.current.rotation.z -= dt * 0.25;
  });

  return (
    <>
      <group ref={tilt}>
        <group ref={spin}>
          <points ref={cloud}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[d.pos, 3]} />
              <bufferAttribute attach="attributes-color" args={[d.col, 3]} />
            </bufferGeometry>
            <pointsMaterial size={mobile ? 0.045 : 0.035} vertexColors transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
          </points>
          <mesh geometry={ico}><meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.32} /></mesh>
          <mesh rotation={[0.4, 0, 0.3]}>
            <icosahedronGeometry args={[2.35, 0]} />
            <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.28} />
          </mesh>
          {!mobile && <mesh><icosahedronGeometry args={[1.95, 1]} /><meshBasicMaterial color="#6366f1" transparent opacity={0.06} side={THREE.DoubleSide} depthWrite={false} /></mesh>}
          <group ref={ring1} rotation={[1.25, 0.2, 0]}>
            <mesh><torusGeometry args={[2.7, 0.006, 6, 160]} /><meshBasicMaterial color="#22d3ee" transparent opacity={0.45} /></mesh>
            <mesh position={[2.7, 0, 0]}><sphereGeometry args={[0.06, 8, 8]} /><meshBasicMaterial color="#e0f2fe" /></mesh>
          </group>
          <group ref={ring2} rotation={[0.5, 1.1, 0]}>
            <mesh><torusGeometry args={[3.1, 0.006, 6, 160]} /><meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} /></mesh>
            <mesh position={[3.1, 0, 0]}><sphereGeometry args={[0.05, 8, 8]} /><meshBasicMaterial color="#f0abfc" /></mesh>
          </group>
          {bits.map((v, i) => <mesh key={i} position={v}><boxGeometry args={[0.07, 0.07, 0.07]} /><meshBasicMaterial color={i % 3 ? "#7dd3fc" : "#d946ef"} /></mesh>)}
          <mesh ref={core}>
            <icosahedronGeometry args={[0.62, 2]} />
            <meshStandardMaterial color="#0a1226" emissive="#22d3ee" emissiveIntensity={1.1} metalness={0.9} roughness={0.15} />
          </mesh>
          {nodes.map((v, i) => (
            <mesh key={i} position={v}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshBasicMaterial color={i % 5 === 0 ? "#d946ef" : "#7dd3fc"} />
            </mesh>
          ))}
          <lineSegments>
            <bufferGeometry><bufferAttribute attach="attributes-position" args={[lines, 3]} /></bufferGeometry>
            <lineBasicMaterial color="#a78bfa" transparent opacity={0.4} />
          </lineSegments>
        </group>
      </group>
      <pointLight ref={light} intensity={40} color="#7dd3fc" distance={12} />
    </>
  );
}

export default function DigitalCore({ active }) {
  return (
    <Canvas style={{ position: "absolute", inset: 0, pointerEvents: "none" }} frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7.5], fov: 45 }} dpr={[1, mobile ? 1.25 : 1.75]}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      eventSource={document.body} eventPrefix="client">
      <ambientLight intensity={0.4} />
      <Core />
    </Canvas>
  );
}
