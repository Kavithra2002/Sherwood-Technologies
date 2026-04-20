import { useEffect, useRef } from "react";
import * as THREE from "three";

export type GreenHeroSceneOptions = {
  /** When false, camera Z stays fixed (e.g. section backgrounds). Default true for hero, false when appearance is light. */
  scrollDrivenCamera?: boolean;
  particleCount?: number;
  /** `hero` = dark green home hero. `light` = white backdrop with subtle neutral / brand accents. */
  appearance?: "hero" | "light";
};

/** Live Three.js hero background (same idea as a pre-rendered loop “video”, but runs in WebGL). */
export class GreenHeroScene {
  container: HTMLDivElement;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer | null = null;
  particles: THREE.Points | null = null;
  objects: Array<{
    mesh: THREE.Mesh;
    vx: number;
    vy: number;
    vz: number;
    ox: number;
    oy: number;
    oz: number;
    phase: number;
    driftX: number;
    driftY: number;
    driftZ: number;
  }> = [];
  animationId: number | null = null;
  resizeObserver: ResizeObserver | null = null;
  baseZ = 50;
  scrollDrivenCamera: boolean;
  particleCount: number;
  appearance: "hero" | "light";
  onResize: () => void;

  constructor(container: HTMLDivElement, options: GreenHeroSceneOptions = {}) {
    this.container = container;
    this.appearance = options.appearance ?? "hero";
    const defaultScroll = this.appearance === "hero";
    this.scrollDrivenCamera = options.scrollDrivenCamera ?? defaultScroll;
    this.particleCount = options.particleCount ?? (this.appearance === "light" ? 320 : 380);
    this.onResize = () => this.syncSize();
    this.init();
  }

  init() {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    const light = this.appearance === "light";
    // Keep WebGL colours aligned with Tailwind theme tokens:
    // `primary` (#79C72C) and `accent` (#4c9141) in `tailwind.config.cjs`.
    const brandPrimary = 0x79c72c;
    const brandAccent = 0x4c9141;
    const bg = light ? 0xffffff : 0x103326;
    this.scene.background = new THREE.Color(bg);

    this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    this.camera.position.z = this.baseZ;

    if (!window.WebGLRenderingContext) {
      console.warn("WebGL is not supported in this browser/environment.");
      return;
    }

    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch (error) {
      console.warn("Unable to create WebGL renderer for hero background.", error);
      return;
    }

    // Prevent stacked canvases during fast remount/HMR cycles.
    if (this.container.firstChild) {
      this.container.replaceChildren();
    }

    this.renderer.setSize(w, h);
    this.renderer.setClearColor(bg, 1);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.domElement.className = "pointer-events-none block h-full w-full";
    this.container.appendChild(this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight(0xffffff, light ? 0.68 : 0.52));

    if (light) {
      const l1 = new THREE.PointLight(brandPrimary, 0.95);
      l1.position.set(95, 72, 55);
      this.scene.add(l1);

      const l2 = new THREE.PointLight(brandAccent, 0.72);
      l2.position.set(-78, -58, 48);
      this.scene.add(l2);

      const l3 = new THREE.PointLight(brandPrimary, 0.55);
      l3.position.set(0, 36, -55);
      this.scene.add(l3);
    } else {
      const l1 = new THREE.PointLight(0x79c72c, 1.15);
      l1.position.set(100, 80, 60);
      this.scene.add(l1);

      const l2 = new THREE.PointLight(0x4ade80, 0.68);
      l2.position.set(-90, -70, 50);
      this.scene.add(l2);

      const l3 = new THREE.PointLight(0x22c55e, 0.45);
      l3.position.set(0, 40, -60);
      this.scene.add(l3);
    }

    this.createParticles();
    this.createCubes();
    this.createSpheres();
    this.createTorus();

    this.resizeObserver = new ResizeObserver(() => this.syncSize());
    this.resizeObserver.observe(this.container);

    this.animate();
  }

  syncSize() {
    if (!this.renderer) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w < 1 || h < 1) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  createParticles() {
    const geo = new THREE.BufferGeometry();
    const count = this.particleCount;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 220;
      pos[i + 1] = (Math.random() - 0.5) * 220;
      pos[i + 2] = (Math.random() - 0.5) * 220;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const light = this.appearance === "light";
    const brandPrimary = 0x79c72c;
    const mat = new THREE.PointsMaterial({
      size: light ? 0.52 : 0.55,
      color: light ? brandPrimary : 0x79c72c,
      sizeAttenuation: true,
      transparent: true,
      opacity: light ? 0.39 : 0.62,
    });
    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  createCubes() {
    const light = this.appearance === "light";
    const brandPrimary = 0x79c72c;
    const brandAccent = 0x4c9141;
    const geo = new THREE.BoxGeometry(3, 3, 3);
    const mat = new THREE.MeshPhongMaterial({
      color: light ? brandAccent : 0x4c9141,
      emissive: light ? brandPrimary : 0x14532d,
      transparent: true,
      opacity: light ? 0.31 : 0.32,
      wireframe: true,
    });

    const c1 = new THREE.Mesh(geo, mat);
    c1.position.set(-30, 15, 0);
    this.scene.add(c1);
    this.objects.push({
      mesh: c1,
      vx: 0.018,
      vy: 0.01,
      vz: 0.014,
      ox: c1.position.x,
      oy: c1.position.y,
      oz: c1.position.z,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.035,
      driftY: (Math.random() - 0.5) * 0.035,
      driftZ: (Math.random() - 0.5) * 0.02,
    });

    const c2 = new THREE.Mesh(geo, mat.clone());
    c2.position.set(30, -15, 0);
    this.scene.add(c2);
    this.objects.push({
      mesh: c2,
      vx: -0.014,
      vy: 0.018,
      vz: -0.01,
      ox: c2.position.x,
      oy: c2.position.y,
      oz: c2.position.z,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.035,
      driftY: (Math.random() - 0.5) * 0.035,
      driftZ: (Math.random() - 0.5) * 0.02,
    });
  }

  createSpheres() {
    const light = this.appearance === "light";
    const brandPrimary = 0x79c72c;
    const geo = new THREE.IcosahedronGeometry(5, 4);
    const mat = new THREE.MeshPhongMaterial({
      color: light ? brandPrimary : 0x86efac,
      emissive: light ? brandPrimary : 0x14532d,
      transparent: true,
      opacity: light ? 0.29 : 0.22,
      wireframe: true,
    });

    const s1 = new THREE.Mesh(geo, mat);
    s1.position.set(-40, -20, -20);
    this.scene.add(s1);
    this.objects.push({
      mesh: s1,
      vx: 0.01,
      vy: -0.014,
      vz: 0.018,
      ox: s1.position.x,
      oy: s1.position.y,
      oz: s1.position.z,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.03,
      driftY: (Math.random() - 0.5) * 0.03,
      driftZ: (Math.random() - 0.5) * 0.02,
    });

    const s2 = new THREE.Mesh(geo, mat.clone());
    s2.position.set(40, 20, -20);
    this.scene.add(s2);
    this.objects.push({
      mesh: s2,
      vx: -0.018,
      vy: 0.01,
      vz: 0.014,
      ox: s2.position.x,
      oy: s2.position.y,
      oz: s2.position.z,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.03,
      driftY: (Math.random() - 0.5) * 0.03,
      driftZ: (Math.random() - 0.5) * 0.02,
    });
  }

  createTorus() {
    const light = this.appearance === "light";
    const brandPrimary = 0x79c72c;
    const geo = new THREE.TorusGeometry(8, 2, 16, 32);
    const mat = new THREE.MeshPhongMaterial({
      color: light ? brandPrimary : 0x4ade80,
      emissive: light ? brandPrimary : 0x166534,
      transparent: true,
      opacity: light ? 0.31 : 0.26,
      wireframe: true,
    });

    const t = new THREE.Mesh(geo, mat);
    t.position.set(0, 0, -30);
    this.scene.add(t);
    this.objects.push({
      mesh: t,
      vx: 0.005,
      vy: 0.007,
      vz: 0,
      ox: t.position.x,
      oy: t.position.y,
      oz: t.position.z,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.025,
      driftY: (Math.random() - 0.5) * 0.025,
      driftZ: (Math.random() - 0.5) * 0.018,
    });
  }

  animate() {
    if (!this.renderer) return;
    this.animationId = requestAnimationFrame(() => this.animate());

    if (this.scrollDrivenCamera) {
      const scrollRatio = Math.min(window.scrollY / window.innerHeight, 1);
      this.camera.position.z = this.baseZ - scrollRatio * 18;
    }

    if (this.particles) {
      this.particles.rotation.x += 0.00008;
      this.particles.rotation.y += 0.00015;
    }

    const t = Date.now() * 0.001;
    const tMove = t * 0.5;
    const light = this.appearance === "light";
    const orbitRadius = light ? 34 : 46;
    const sway = light ? 7.5 : 10.5;
    const zSway = light ? 6 : 9;
    this.objects.forEach((obj, i) => {
      obj.mesh.rotation.x += obj.vx;
      obj.mesh.rotation.y += obj.vy;
      obj.mesh.rotation.z += obj.vz;

      // Move objects around the scene (not just rotate in place).
      // Two layers of motion: a slow orbit + a gentle drifting offset.
      const speed = 0.12 + i * 0.03;
      const a = tMove * speed + obj.phase;
      const orbitX = Math.cos(a) * (orbitRadius + i * 3.5);
      const orbitY = Math.sin(a * 0.9) * (orbitRadius - i * 2.5);
      const bobX = Math.sin(tMove * 0.75 + i) * sway;
      const bobY = Math.cos(tMove * 0.65 + i * 0.7) * sway;
      const bobZ = Math.sin(tMove * 0.55 + i * 0.5) * zSway;

      // Slow drift that changes direction over time.
      obj.ox += obj.driftX * 0.5;
      obj.oy += obj.driftY * 0.5;
      obj.oz += obj.driftZ * 0.5;
      const driftBound = light ? 18 : 26;
      if (obj.ox > driftBound || obj.ox < -driftBound) obj.driftX *= -1;
      if (obj.oy > driftBound || obj.oy < -driftBound) obj.driftY *= -1;
      if (obj.oz > 16 || obj.oz < -55) obj.driftZ *= -1;

      obj.mesh.position.x = orbitX + bobX + obj.ox * 0.35;
      obj.mesh.position.y = orbitY + bobY + obj.oy * 0.35;
      obj.mesh.position.z = -18 + bobZ + obj.oz * 0.4;
    });

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.renderer?.domElement.parentNode) {
      this.container.removeChild(this.renderer.domElement);
    }
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const mat = object.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        }
      });
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null;
    }
  }
}

export function HomeHeroThreeBackground({
  appearance = "hero",
  className,
}: {
  appearance?: "hero" | "light";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<GreenHeroScene | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    sceneRef.current = new GreenHeroScene(el, { appearance });
    return () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [appearance]);

  const rootClass =
    appearance === "hero"
      ? "absolute inset-0 z-0 min-h-[22rem] w-full"
      : "absolute inset-0 z-0 h-full min-h-full w-full";

  return (
    <div
      ref={containerRef}
      className={[rootClass, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    />
  );
}
