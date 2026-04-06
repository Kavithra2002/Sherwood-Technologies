import * as THREE from "three";
export type GreenHeroSceneOptions = {
    /** When false, camera Z stays fixed (e.g. small embedded previews). Default true. */
    scrollDrivenCamera?: boolean;
    particleCount?: number;
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
    }>;
    animationId: number | null;
    resizeObserver: ResizeObserver | null;
    baseZ: number;
    scrollDrivenCamera: boolean;
    particleCount: number;
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
export declare function HomeHeroThreeBackground(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HomeHeroThreeBackground.d.ts.map