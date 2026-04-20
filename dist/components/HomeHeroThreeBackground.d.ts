import * as THREE from "three";
export type GreenHeroSceneOptions = {
    /** When false, camera Z stays fixed (e.g. section backgrounds). Default true for hero, false when appearance is light. */
    scrollDrivenCamera?: boolean;
    particleCount?: number;
    /** `hero` = dark green home hero. `light` = white backdrop with subtle neutral / brand accents. */
    appearance?: "hero" | "light";
};
/** Live Three.js hero background (same idea as a pre-rendered loop “video”, but runs in WebGL). */
export declare class GreenHeroScene {
    container: HTMLDivElement;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer | null;
    particles: THREE.Points | null;
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
    }>;
    animationId: number | null;
    resizeObserver: ResizeObserver | null;
    baseZ: number;
    scrollDrivenCamera: boolean;
    particleCount: number;
    appearance: "hero" | "light";
    onResize: () => void;
    constructor(container: HTMLDivElement, options?: GreenHeroSceneOptions);
    init(): void;
    syncSize(): void;
    createParticles(): void;
    createCubes(): void;
    createSpheres(): void;
    createTorus(): void;
    animate(): void;
    dispose(): void;
}
export declare function HomeHeroThreeBackground({ appearance, className, }: {
    appearance?: "hero" | "light";
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HomeHeroThreeBackground.d.ts.map