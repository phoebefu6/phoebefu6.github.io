import { useEffect, useRef, useState } from 'react'

interface Spark {
  id: number
  x: number
  y: number
}

const RAYS = 8

/** React Bits ClickSpark - tiny plum spark burst on every click. House favorite. */
export function ClickSpark() {
  const [sparks, setSparks] = useState<Spark[]>([])
  const counter = useRef(0)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const id = ++counter.current
      setSparks((s) => [...s, { id, x: e.clientX, y: e.clientY }])
      window.setTimeout(() => setSparks((s) => s.filter((sp) => sp.id !== id)), 450)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[95]" aria-hidden>
      {sparks.map((sp) => (
        <span key={sp.id} className="absolute" style={{ left: sp.x, top: sp.y }}>
          {Array.from({ length: RAYS }, (_, i) => (
            <span
              key={i}
              className="spark-ray"
              style={{ transform: `rotate(${(360 / RAYS) * i}deg)` }}
            />
          ))}
        </span>
      ))}
    </div>
  )
}
