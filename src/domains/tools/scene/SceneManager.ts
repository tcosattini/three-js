import * as THREE from "three";
import { AssetManager } from "../asset/AssetManager";
import { Grid } from "../../elements/ grid/Grid";
import { CameraManager } from "../camera/CameraManager";

export class SceneManager {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  assetManager: AssetManager;
  gameWindow: HTMLElement;
  cameraManager: CameraManager;
  cube: THREE.Mesh;
  grid: Grid;

  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene = new THREE.Scene();
    this.assetManager = new AssetManager();
    this.gameWindow = document.querySelector("#render-area")!;
    this.cameraManager = new CameraManager(
      this.gameWindow,
      this.renderer,
      this.scene
    );
    this.grid = new Grid(
      this.assetManager,
      this.scene,
      this.cameraManager.camera,
      this.renderer
    );

    this.configRender();
    this.scene.add(this.cube);

    this.renderer.render(this.scene, this.cameraManager.camera);
  }

  private configRender() {
    this.gameWindow.appendChild(this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
