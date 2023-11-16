import * as THREE from "three";
import { AssetManager } from "../../tools/asset/AssetManager";
import { RayCasterGridSelection } from "../../tools/rayCaster/RayCasterGridSelection";

export class Grid {
  assetManager: AssetManager;
  scene: THREE.Scene;
  camera: THREE.Camera;
  size: number;
  divisions: number;
  grid: THREE.GridHelper;
  planeMesh: THREE.Mesh;
  gridSelection: THREE.Mesh;
  gridHover: THREE.Mesh;
  raycasterGridSelection: RayCasterGridSelection;
  renderer: THREE.Renderer;

  constructor(
    assetManager: AssetManager,
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.Renderer
  ) {
    this.assetManager = assetManager;
    this.scene = scene;
    this.camera = camera;
    this.size = 100;
    this.divisions = 100;
    this.grid = new THREE.GridHelper(this.size, this.divisions);
    this.planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false })
    );
    this.gridSelection = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        color: "red",
      })
    );
    this.gridHover = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        color: "blue",
      })
    );
    this.renderer = renderer;
    this.raycasterGridSelection = new RayCasterGridSelection(
      this.scene,
      this.camera,
      this.planeMesh,
      this.gridSelection,
      this.gridHover,
      this.renderer,
      this.grid
    );

    this.setupMesh();
  }

  

  setupMesh() {
    this.planeMesh.rotateX(Math.PI / 2);
    this.gridSelection.rotateX(Math.PI / 2);
    this.gridSelection.position.set(0.5, 0, 0.5);
    this.gridHover.rotateX(Math.PI / 2);
    this.gridHover.position.set(0.5, 0, 0.5);
    this.scene.add(this.planeMesh, this.gridSelection, this.gridHover);
  }
}
