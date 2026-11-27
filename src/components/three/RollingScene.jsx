import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { IcosahedronGeometry, MathUtils, PMREMGenerator, Vector3 } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const stops = [1, -1, 1, -1, 1, -1, 1, 0]
const point = new Vector3()
const pearls = [[2, 0.9, 0], [-1.9, -0.8, 0.5], [0.8, -1.9, -0.4], [-1.2, 1.7, -0.6]]

function Studio() {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl)
    const target = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = target.texture
    return () => {
      scene.environment = null
      target.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  return null
}

function Orb({ progress, aboutActive }) {
  const move = useRef(null)
  const spin = useRef(null)
  const liquid = useRef(null)

  const [geometry, base] = useMemo(() => {
    const raw = new IcosahedronGeometry(1.2, 24)
    raw.deleteAttribute('normal')
    raw.deleteAttribute('uv')
    const merged = mergeVertices(raw)
    merged.computeVertexNormals()
    return [merged, merged.attributes.position.array.slice()]
  }, [])

  useFrame(({ viewport, clock }, delta) => {
    const time = clock.elapsedTime
    const position = liquid.current.geometry.attributes.position
    for (let v = 0; v < position.count; v++) {
      point.fromArray(base, v * 3)
      const wave =
        Math.sin(point.x * 2.5 + time) *
        Math.sin(point.y * 2.5 + time * 0.8) *
        Math.sin(point.z * 2.5 + time * 0.6)
      point.multiplyScalar(1 + wave * 0.18)
      position.setXYZ(v, point.x, point.y, point.z)
    }
    position.needsUpdate = true
    liquid.current.geometry.computeVertexNormals()

    const s = progress.current * (stops.length - 1)
    const i = Math.min(Math.floor(s), stops.length - 2)
    const t = MathUtils.smoothstep(s - i, 0, 1)
    const small = viewport.width < 6
    const x = small
      ? 0
      : MathUtils.lerp(stops[i], stops[i + 1], t) * viewport.width * 0.25 -
        (aboutActive ? viewport.width * 0.17 : 0)

    move.current.position.x = MathUtils.damp(move.current.position.x, x, 3, delta)
    move.current.position.y = small ? viewport.height * 0.22 * (1 - Math.min(s, 1)) : 0
    move.current.scale.setScalar(small ? 0.5 : 1)
    spin.current.rotation.z = -move.current.position.x
    spin.current.rotation.x = MathUtils.damp(spin.current.rotation.x, s * Math.PI * 2, 3, delta)
    spin.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={move}>
      <group ref={spin}>
        <mesh ref={liquid} geometry={geometry}>
          <meshStandardMaterial color="#E3B866" metalness={1} roughness={0.14} />
        </mesh>
        {[[1.8, 1.3, 0], [2.15, 0.4, 1]].map(([radius, x, y]) => (
          <mesh key={radius} rotation={[x, y, 0]}>
            <torusGeometry args={[radius, 0.012, 12, 180]} />
            <meshStandardMaterial color="#F3DCA2" metalness={1} roughness={0.2} />
          </mesh>
        ))}
        {pearls.map((spot) => (
          <mesh key={spot.join()} position={spot}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#FFF4DC" metalness={0.8} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function RollingScene({ progress, aboutActive }) {
  return (
    <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 1.5]}>
      <Studio />
      <directionalLight position={[4, 5, 5]} intensity={1.5} />
      <pointLight position={[-4, -2, 3]} color="#FFB347" intensity={20} />
      <Orb progress={progress} aboutActive={aboutActive} />
    </Canvas>
  )
}

export default RollingScene
