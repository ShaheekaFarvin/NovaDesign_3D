import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OctahedronGeometry } from 'three'

const box = new OctahedronGeometry(1.5)

function Cube() {
  const ref = useRef(null)
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.25
    ref.current.rotation.y += delta * 0.4
  })

  return (
    <group ref={ref} rotation={[0.6, 0.7, 0]}>
      <mesh geometry={box}>
        <meshPhysicalMaterial color="#F57C00" transparent opacity={0.45} roughness={0.05} metalness={0.3} clearcoat={1} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[box]} />
        <lineBasicMaterial color="#F6EBD3" />
      </lineSegments>
      <mesh scale={0.45} geometry={box}>
        <meshStandardMaterial color="#F6EBD3" emissive="#F57C00" />
      </mesh>
    </group>
  )
}

function CrystalScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
      <ambientLight intensity={1} />
      <directionalLight position={[3, 3, 4]} intensity={3} />
      <pointLight position={[-3, -2, 2]} color="#F6EBD3" intensity={30} />
      <Cube />
    </Canvas>
  )
}

export default CrystalScene