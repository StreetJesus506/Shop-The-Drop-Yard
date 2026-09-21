// components/ShippingContainer.js
'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ShippingContainer({ brand, isActive, onClick }) {
  const mountRef = useRef(null)
  
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    
    // ... Move ALL of your Three.js logic, loop animations, and renderer code exactly as it is here ...
    
    return () => {
      // Clean up renderer when unmounted to free up mobile memory
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [brand])

  return <div ref={mountRef} className="w-full h-full" onClick={onClick} />
}
