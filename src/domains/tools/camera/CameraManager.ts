import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class CameraManager {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  constructor(
    gameWindow: HTMLElement,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene
  ) {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.controls = new OrbitControls(this.camera, gameWindow);
    this.renderer = renderer;
    this.scene = scene;
    this.camera.position.set(0, 20, 100);

    this.renderer.setAnimationLoop(
      () => this.renderer.render(this.scene, this.camera)!
    );
  }
}
