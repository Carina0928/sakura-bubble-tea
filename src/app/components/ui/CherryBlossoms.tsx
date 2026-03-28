'use client'

import { useEffect, useRef } from 'react'

// Performance-optimized 3D sakura animation
// Max 30 particles, throttled RAF, no canvas filter (too slow)

interface Petal {
  x: number; y: number
  vx: number; vy: number
  rot: number; rotV: number
  flipX: number; flipXV: number  // fake 3D X-axis rotation
  flipY: number; flipYV: number  // fake 3D Y-axis rotation
  size: number; opacity: number
  layer: 0 | 1 | 2              // 0=far(small,faint), 1=mid, 2=near(big,vivid)
  type: 'petal' | 'flower'
  phase: number; freq: number
  r: number; g: number; b: number  // color
}

const LAYER_CONFIG = [
  { count: 12, sizeMin: 4,  sizeMax: 8,  opMin: 0.12, opMax: 0.28, vyMin: 0.25, vyMax: 0.6  },  // far
  { count: 10, sizeMin: 7,  sizeMax: 13, opMin: 0.28, opMax: 0.45, vyMin: 0.45, vyMax: 0.9  },  // mid
  { count: 8,  sizeMin: 12, sizeMax: 20, opMin: 0.38, opMax: 0.6,  vyMin: 0.6,  vyMax: 1.2  },  // near
]

// Warm pink palette with slight variation
function randColor() {
  const palette = [
    [255, 183, 200], [255, 160, 185], [255, 210, 225],
    [250, 140, 170], [255, 228, 238], [248, 175, 198],
  ]
  return palette[Math.floor(Math.random() * palette.length)]
}

function spawnPetal(W: number, H: number, layer: 0|1|2, fromTop: boolean): Petal {
  const cfg = LAYER_CONFIG[layer]
  const type: 'petal'|'flower' = Math.random() < 0.6 ? 'petal' : 'flower'
  const [r, g, b] = randColor()
  return {
    x: Math.random() * (W + 80) - 40,
    y: fromTop ? -(20 + Math.random() * 200) : Math.random() * H,
    vx: (Math.random() - 0.5) * 0.6,
    vy: cfg.vyMin + Math.random() * (cfg.vyMax - cfg.vyMin),
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.03,
    flipX: Math.random() * Math.PI * 2,
    flipXV: (Math.random() - 0.5) * 0.02,
    flipY: Math.random() * Math.PI * 2,
    flipYV: (Math.random() - 0.5) * 0.015,
    size: cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin),
    opacity: cfg.opMin + Math.random() * (cfg.opMax - cfg.opMin),
    layer, type,
    phase: Math.random() * Math.PI * 2,
    freq: 0.008 + Math.random() * 0.016,
    r, g, b,
  }
}

// Draw a realistic sakura petal with 3D skew effect
function drawPetal(
  ctx: CanvasRenderingContext2D,
  size: number, op: number,
  flipX: number, flipY: number,
  r: number, g: number, b: number
) {
  // 3D perspective via scale
  const sx = Math.cos(flipY)   // horizontal squeeze
  const sy = 0.3 + 0.7 * Math.abs(Math.cos(flipX))  // vertical squeeze (min 0.3 so never invisible)
  const bright = 0.7 + 0.3 * Math.abs(Math.cos(flipX))  // light/shadow

  const br = Math.round(r * bright)
  const bg = Math.round(g * bright)
  const bb = Math.round(b * bright)

  ctx.save()
  ctx.scale(sx || 0.1, sy)

  const w = size * 0.65
  const h = size

  // Radial gradient — lighter center, deeper edges
  const grad = ctx.createRadialGradient(-w*0.1, -h*0.2, 0, 0, 0, h*0.9)
  grad.addColorStop(0,   `rgba(255,248,252,${op})`)
  grad.addColorStop(0.3, `rgba(${br},${bg},${bb},${op})`)
  grad.addColorStop(0.75,`rgba(${Math.max(br-18,0)},${Math.max(bg-25,0)},${Math.max(bb-15,0)},${op*0.85})`)
  grad.addColorStop(1,   `rgba(${Math.max(br-35,0)},${Math.max(bg-45,0)},${Math.max(bb-30,0)},${op*0.6})`)
  ctx.fillStyle = grad

  // Sakura petal: rounded with bilobed notch at tip
  ctx.beginPath()
  ctx.moveTo(0, h*0.55)                              // bottom point
  ctx.bezierCurveTo(-w*0.58, h*0.22, -w*0.6, -h*0.08, -w*0.34, -h*0.28)
  ctx.bezierCurveTo(-w*0.2,  -h*0.52, 0, -h*0.44, 0, -h*0.44)   // left lobe
  ctx.bezierCurveTo( w*0.2,  -h*0.52, w*0.34, -h*0.28, w*0.34, -h*0.28)
  ctx.bezierCurveTo( w*0.6,  -h*0.08, w*0.58, h*0.22, 0, h*0.55) // right side
  ctx.closePath()
  ctx.fill()

  // Center vein
  const veinOp = op * 0.22
  ctx.strokeStyle = `rgba(${Math.max(br-55,0)},${Math.max(bg-70,0)},${Math.max(bb-50,0)},${veinOp})`
  ctx.lineWidth = w * 0.05
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(0, h*0.5)
  ctx.bezierCurveTo(0, h*0.1, 0, -h*0.1, 0, -h*0.36)
  ctx.stroke()

  // 3 side veins each side
  for (let i = 0; i < 3; i++) {
    const y0 = h * (0.18 - i * 0.19)
    const spread = w * (0.18 + i * 0.06)
    ctx.beginPath()
    ctx.moveTo(0, y0)
    ctx.bezierCurveTo(spread*0.5, y0-h*0.06, spread, y0-h*0.09, spread*1.1, y0-h*0.07)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, y0)
    ctx.bezierCurveTo(-spread*0.5, y0-h*0.06, -spread, y0-h*0.09, -spread*1.1, y0-h*0.07)
    ctx.stroke()
  }

  // Soft highlight (top-left)
  const hl = ctx.createRadialGradient(-w*0.18, -h*0.18, 0, -w*0.1, -h*0.1, w*0.45)
  hl.addColorStop(0, `rgba(255,255,255,${op*0.4})`)
  hl.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = hl
  ctx.beginPath()
  ctx.ellipse(-w*0.12, -h*0.12, w*0.38, h*0.28, -0.3, 0, Math.PI*2)
  ctx.fill()

  ctx.restore()
}

function drawFlower(
  ctx: CanvasRenderingContext2D,
  size: number, op: number,
  flipX: number, flipY: number,
  r: number, g: number, b: number
) {
  const sx = Math.cos(flipY)
  const sy = 0.25 + 0.75 * Math.abs(Math.cos(flipX))

  ctx.save()
  ctx.scale(sx || 0.1, sy)

  // 5 petals
  for (let i = 0; i < 5; i++) {
    ctx.save()
    ctx.rotate((i / 5) * Math.PI * 2 + Math.PI * 0.1)
    ctx.translate(0, -size * 0.4)
    ctx.scale(0.68, 0.68)
    // Draw individual petal without the 3D skew (already applied to whole flower)
    const w = size * 0.65 * 0.68
    const h = size * 0.68
    const bright = 0.75 + 0.25 * Math.abs(Math.cos(flipX))
    const br = Math.round(r*bright), bg2 = Math.round(g*bright), bb2 = Math.round(b*bright)
    const grad = ctx.createRadialGradient(-w*0.1, -h*0.2, 0, 0, 0, h*0.9)
    grad.addColorStop(0, `rgba(255,248,252,${op*0.9})`)
    grad.addColorStop(0.4, `rgba(${br},${bg2},${bb2},${op*0.85})`)
    grad.addColorStop(1, `rgba(${Math.max(br-30,0)},${Math.max(bg2-40,0)},${Math.max(bb2-25,0)},${op*0.5})`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(0, h*0.55)
    ctx.bezierCurveTo(-w*0.58, h*0.22, -w*0.6, -h*0.08, -w*0.34, -h*0.28)
    ctx.bezierCurveTo(-w*0.2, -h*0.52, 0, -h*0.44, 0, -h*0.44)
    ctx.bezierCurveTo(w*0.2, -h*0.52, w*0.34, -h*0.28, w*0.34, -h*0.28)
    ctx.bezierCurveTo(w*0.6, -h*0.08, w*0.58, h*0.22, 0, h*0.55)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  // Center
  const cg = ctx.createRadialGradient(0,0,0,0,0,size*0.22)
  cg.addColorStop(0,`rgba(255,250,200,${op})`)
  cg.addColorStop(0.6,`rgba(255,230,140,${op*0.9})`)
  cg.addColorStop(1,`rgba(240,185,90,${op*0.7})`)
  ctx.beginPath()
  ctx.arc(0,0,size*0.22,0,Math.PI*2)
  ctx.fillStyle = cg
  ctx.fill()
  // Stamen dots
  for (let i=0;i<8;i++){
    const a=(i/8)*Math.PI*2, d=size*0.15
    ctx.beginPath()
    ctx.arc(Math.cos(a)*d,Math.sin(a)*d,size*0.032,0,Math.PI*2)
    ctx.fillStyle=`rgba(205,90,45,${op*0.75})`
    ctx.fill()
  }

  ctx.restore()
}

export default function CherryBlossoms() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const petals = useRef<Petal[]>([])
  const raf = useRef(0)
  const tick = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Spawn all particles
    const all: Petal[] = []
    for (let layer = 0; layer < 3; layer++) {
      const cfg = LAYER_CONFIG[layer]
      for (let i = 0; i < cfg.count; i++) {
        all.push(spawnPetal(canvas.width, canvas.height, layer as 0|1|2, false))
      }
    }
    petals.current = all

    const draw = () => {
      tick.current++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      petals.current.forEach((p, i) => {
        // Physics
        p.x += p.vx + Math.sin(tick.current * p.freq + p.phase) * 0.55
        p.y += p.vy
        p.rot += p.rotV
        p.flipX += p.flipXV
        p.flipY += p.flipYV

        if (p.y > canvas.height + 30) {
          petals.current[i] = spawnPetal(canvas.width, canvas.height, p.layer, true)
          return
        }
        if (p.x < -50) p.x = canvas.width + 50
        if (p.x > canvas.width + 50) p.x = -50

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)

        if (p.type === 'petal') {
          drawPetal(ctx, p.size, p.opacity, p.flipX, p.flipY, p.r, p.g, p.b)
        } else {
          drawFlower(ctx, p.size, p.opacity, p.flipX, p.flipY, p.r, p.g, p.b)
        }

        ctx.restore()
      })

      raf.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  )
}
