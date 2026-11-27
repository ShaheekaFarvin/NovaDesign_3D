import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Crystal({ progress }) {
  const group = useRef(null)

  useFrame((_, delta) => {
    const p = progress.current
    group.current.rotation.x += delta * 0.2
    group.current.rotation.y += delta * 0.3
    group.current.scale.setScalar(0.6 + p * p * 3.4)
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.5} roughness={0.25} flatShading />
      </mesh>
      <mesh scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function PortalScene({ progress }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={2} />
      <pointLight position={[-3, -2, 3]} color="#22d3ee" intensity={30} />
      <Crystal progress={progress} />
    </Canvas>
  )
}

export default PortalScene