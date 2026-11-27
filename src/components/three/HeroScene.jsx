import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const stars = new Float32Array(600).map(() => (Math.random() - 0.5) * 10)

function Ring() {
  const ring = useRef(null)
  const orbit = useRef(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ring.current.rotation.x = 0.5 + Math.sin(t * 0.5) * 0.3
    ring.current.rotation.y = t * 0.4
    ring.current.position.y = Math.sin(t) * 0.12
    orbit.current.rotation.z = t * 0.15
  })

  return (
    <>
      <mesh ref={ring}>
        <torusKnotGeometry args={[0.95, 0.3, 160, 32]} />
        <meshPhysicalMaterial
          color="#F57C00"
          emissive="#5C2E00"
          metalness={0.6}
          roughness={0.12}
          clearcoat={1}
        />
      </mesh>
      <group rotation={[1.25, 0.2, 0]}>
        <group ref={orbit}>
          <mesh>
            <torusGeometry args={[2.3, 0.012, 8, 160]} />
            <meshBasicMaterial color="#F6EBD3" />
          </mesh>
          <mesh position={[2.3, 0, 0]}>
            <sphereGeometry args={[0.14, 32, 32]} />
            <meshStandardMaterial color="#F57C00" emissive="#0B4F3E" />
          </mesh>
        </group>
      </group>
    </>
  )
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={3} />
      <pointLight position={[-3, -1, 2]} color="#F6EBD3" intensity={40} />
      <pointLight position={[3, -2, 2]} color="#F57C00" intensity={40} />
      <Ring />
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#F6EBD3" size={0.03} />
      </points>
    </Canvas>
  )
}

export default HeroScene