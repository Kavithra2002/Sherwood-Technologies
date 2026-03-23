import React, { useRef, useEffect, useCallback } from 'react'
import { MINIMAP_CONFIG, worldToCanvas, getFloorConfig, CALIBRATION_MODE } from './minimapConfig'


function Minimap({ playerRef, currentFloor, buildingName, isExpanded, selectedBuilding }) {
    // Only GP Square has floor maps — hide for other buildings
    if (selectedBuilding !== 'gp-square') return null

    const canvasRef = useRef(null)
    const coordRef  = useRef(null)   // debug text element
    const rafRef    = useRef(null)
    const imgCache  = useRef({})     // { [src]: HTMLImageElement }

    // Pre-load every floor image so switching floors is instant
    useEffect(() => {
        Object.values(MINIMAP_CONFIG).forEach(cfg => getOrLoadImage(cfg.image))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getOrLoadImage(src) {
        if (imgCache.current[src]) return imgCache.current[src]
        const img = new Image()
        img.src = src
        imgCache.current[src] = img
        return img
    }

    // ── RAF draw loop ──────────────────────────────────────────────────────────
    useEffect(() => {
        // Dirty-check: skip redraw when nothing has changed
        let lastX        = null
        let lastZ        = null
        let lastRotY     = null
        let lastCfg      = null
        let lastExpanded = null

        const drawMinimap = () => {
            rafRef.current = requestAnimationFrame(drawMinimap)

            const canvas = canvasRef.current
            if (!canvas) return

            const player = playerRef?.current?.current
            if (!player) return

            const { x, y, z } = player.position
            // cameraRotationY is stamped by GameCanvas every frame — it tracks
            // the mouse look direction even when the player is standing still.
            // Fall back to player.rotation.y if not yet available.
            const rotY = player.cameraRotationY ?? player.rotation?.y ?? 0
            const cfg  = getFloorConfig(y)

            // Round to avoid noise triggering redraws on tiny float changes
            const rx = Math.round(x * 100)
            const rz = Math.round(z * 100)
            const rr = Math.round(rotY * 1000)
            if (
                rx === lastX &&
                rz === lastZ &&
                rr === lastRotY &&
                cfg === lastCfg &&
                isExpanded === lastExpanded
            ) return   // nothing changed — skip this frame

            lastX        = rx
            lastZ        = rz
            lastRotY     = rr
            lastCfg      = cfg
            lastExpanded = isExpanded

            // ── Setup ────────────────────────────────────────────────────────
            const W   = canvas.width
            const H   = canvas.height
            const ctx = canvas.getContext('2d')
            const img = getOrLoadImage(cfg.image)

            ctx.clearRect(0, 0, W, H)

            // Dark background behind any letterbox bars
            ctx.fillStyle = '#111827'
            // We can keep it or remove it, but let's draw it anyway.
            ctx.fillRect(0, 0, W, H)

            if (!img.complete || img.naturalWidth === 0) {
                img.onload = () => { lastCfg = null }   // force redraw on load
                return
            }

            // ── 1. Draw floor image (letterbox — same as object-fit:contain) ──
            const {
                px: playerPx,
                py: playerPy,
                drawX, drawY, drawW, drawH
            } = worldToCanvas(x, z, cfg, W, H, img.naturalWidth, img.naturalHeight)

            ctx.drawImage(img, drawX, drawY, drawW, drawH)

            // ── 2. Debug calibration grid (only in CALIBRATION_MODE) ──────────
            if (CALIBRATION_MODE) {
                ctx.save()
                ctx.strokeStyle = 'rgba(255,255,255,0.25)'
                ctx.lineWidth   = 1
                const stepX = drawW / 10
                const stepY = drawH / 10
                ctx.beginPath()
                for (let i = 0; i <= 10; i++) {
                    ctx.moveTo(drawX + i * stepX, drawY)
                    ctx.lineTo(drawX + i * stepX, drawY + drawH)
                    ctx.moveTo(drawX, drawY + i * stepY)
                    ctx.lineTo(drawX + drawW, drawY + i * stepY)
                }
                ctx.stroke()
                ctx.restore()
            }

            // ── 3. Pulsing range ring around the player dot ───────────────────
            const t     = (Date.now() % 1800) / 1800
            const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2)
            ctx.beginPath()
            ctx.arc(playerPx, playerPy, 8 + pulse * 4, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(239,68,68,${0.15 + pulse * 0.12})`
            ctx.fill()

            // ── 4. Directional arrow + center dot ────────────────────────────
            ctx.save()
            ctx.translate(playerPx, playerPy)

            ctx.rotate(-rotY + Math.PI / 2)

            // Arrow
            ctx.beginPath()
            ctx.moveTo(0, -12)   // tip
            ctx.lineTo(5, 6)     // bottom-right
            ctx.lineTo(0, 2)     // inner notch
            ctx.lineTo(-5, 6)    // bottom-left
            ctx.closePath()
            ctx.fillStyle   = '#ef4444'
            ctx.fill()
            ctx.strokeStyle = '#fff'
            ctx.lineWidth   = 1.5
            ctx.stroke()

            // Center dot
            ctx.beginPath()
            ctx.arc(0, 0, 3, 0, Math.PI * 2)
            ctx.fillStyle = '#fff'
            ctx.fill()

            ctx.restore()

            // ── 5. Debug readout ─────────────────────────────────────────────
            if (coordRef.current) {
                const floorNum = Object.entries(MINIMAP_CONFIG)
                    .find(([, c]) => c === cfg)?.[0] ?? '?'
                coordRef.current.textContent =
                    `F${floorNum} | x:${x.toFixed(1)} z:${z.toFixed(1)} | rot:${rotY.toFixed(2)}`
            }
        }
     rafRef.current = requestAnimationFrame(drawMinimap)
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    }, [playerRef, isExpanded]) // eslint-disable-line react-hooks/exhaustive-deps

        // ── Calibration click (active only when CALIBRATION_MODE = true) ──────────
    const calClickRef = useRef(0)
    const handleClick = useCallback((e) => {
        if (!CALIBRATION_MODE) return
        const canvas = canvasRef.current
        if (!canvas) return
        const rect     = canvas.getBoundingClientRect()
        const scaleX   = canvas.width  / rect.width
        const scaleY   = canvas.height / rect.height
        const cpx      = (e.clientX - rect.left) * scaleX
        const cpy      = (e.clientY - rect.top)  * scaleY
        const player   = playerRef?.current?.current
        const worldX   = player ? player.position.x.toFixed(2) : '?'
        const worldZ   = player ? player.position.z.toFixed(2) : '?'
        calClickRef.current += 1
        const label = calClickRef.current === 1 ? 'Ref A' : 'Ref B'
        console.log(`[Minimap Cal] ${label} → canvas(${cpx.toFixed(0)}, ${cpy.toFixed(0)}) world(${worldX}, ${worldZ})`)
        if (calClickRef.current >= 2) calClickRef.current = 0
    }, [playerRef])

       // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className={`game-minimap ${isExpanded ? 'expanded' : ''}`}>
            <div className="minimap-header">
                <span>{buildingName}</span>
                <span className="minimap-floor-label">
                    {currentFloor === 1 ? 'Ground' : `Floor ${currentFloor - 1}`}
                </span>
                <span className="minimap-key">M</span>
            </div>

            <div className="minimap-content">
                <canvas
                    ref={canvasRef}
                    className="minimap-canvas"
                    width={isExpanded ? 400 : 280}
                    height={isExpanded ? 711 : 462}
                    onClick={handleClick}
                    style={CALIBRATION_MODE
                        ? { cursor: 'crosshair', outline: '2px solid #facc15' }
                        : undefined
                    }
                />
                <span ref={coordRef} className="minimap-coords">F? | x:? z:?</span>
            </div>
        </div>
    )
}

export default Minimap


