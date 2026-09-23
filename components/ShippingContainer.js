'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ShippingContainer({ brand, isActive, onClick }) {
  const mountRef = useRef(null)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.offsetWidth
    const h = mount.offsetHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
    camera.position.set(-2.8, 0.3, 5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const dir = new THREE.DirectionalLight(0xffffff, 1.2)
    dir.position.set(3, 5, 5)
    scene.add(dir)
    const rim = new THREE.DirectionalLight(0xffffff, 0.3)
    rim.position.set(-3, 0, -3)
    scene.add(rim)

    const textureLoader = new THREE.TextureLoader()
    const group = new THREE.Group()
    scene.add(group)

    const bodyMat = new THREE.MeshStandardMaterial({
      color: brand.containerColor, roughness: 0.7, metalness: 0.3
    })
    const trimMat = new THREE.MeshStandardMaterial({
      color: brand.trimColor, roughness: 0.6, metalness: 0.4
    })
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf4f1ea, roughness: 1, metalness: 0 })

    group.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.2, 1.0), bodyMat)))

    for (let i = -5; i <= 5; i++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(2.82, 0.035, 1.02), trimMat)
      rib.position.y = i * 0.11
      group.add(rib)
    }

    const postPositions = [[-1.41, 0.5], [1.41, 0.5], [-1.41, -0.5], [1.41, -0.5]].forEach(([x, z]) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.22, 0.07), trimMat)
      post.position.set(x, 0, z)
      group.add(post)
    })

    const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.82, 0.15, 0.02), whiteMat)
    stripe.position.set(0, 0.45, 0.55)
    group.add(stripe)

    if (brand.logo) {
      textureLoader.load(brand.logo, (texture) => {
        const aspect = texture.image.width / texture.image.height
        const logoWidth = 1.2
        const logoHeight = logoWidth / aspect
        const logoGeo = new THREE.PlaneGeometry(logoWidth, logoHeight)
        const logoMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.9,
          color: new THREE.Color(brand.logoTint || '#ffffff'),
        })
        const logoMesh = new THREE.Mesh(logoGeo, logoMat)
        logoMesh.position.set(0, 0, 0.53)
        group.add(logoMesh)
      })
    }

    const door = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.1, 0.02), trimMat)
    door.position.set(0, 0, 0.51)
    group.add(door)

    group.rotation.y = 0.25
    group.rotation.x = -0.06
    group.position.x = 0
    group.position.y = 0
    group.scale.set(1.5, 1.5, 1.5)

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      bodyMat.dispose()
      trimMat.dispose()
      whiteMat.dispose()
    }
  }, [brand])

  return <div ref={mountRef} className="w-full h-full" onClick={onClick} />
}
