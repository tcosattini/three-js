import * as THREE from "three";


export class RayCasterGridSelection {
  mousePosition: THREE.Vector2;
  raycaster: THREE.Raycaster;
  //TODO type this
  intersects: any;
  highlightPosition: THREE.Vector3;
  camera: THREE.Camera;
  scene: THREE.Scene;
  planeMesh: THREE.Mesh;
  gridSelection: THREE.Mesh;
  gridHover: THREE.Mesh;
  renderer: THREE.Renderer;
  grid: THREE.GridHelper;

  public constructor(
    scene: THREE.Scene,
    camera: THREE.Camera,
    planeMesh: THREE.Mesh,
    gridSelection: THREE.Mesh,
    gridHover: THREE.Mesh,
    renderer: THREE.Renderer,
    grid: THREE.GridHelper
  ) {
    this.mousePosition = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.renderer = renderer;
    this.highlightPosition = new THREE.Vector3();
    this.camera = camera;
    this.scene = scene;
    this.planeMesh = planeMesh;
    this.gridSelection = gridSelection;
    this.gridHover = gridHover;
    this.grid = grid;
    this.setupGrid();
  }

  private findRaycastingIntersect(e: MouseEvent) {
    this.mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mousePosition, this.camera);
    this.intersects = this.raycaster.intersectObject(this.planeMesh, true);
  }

  private makeHighLightVector(intersect: any, event: MouseEvent) {
    const highlightPosition = new THREE.Vector3()
      .copy(intersect.point)
      .floor()
      .addScalar(0.5);

    if (event.type === "mousemove") {
      return this.setGridSelectionPosition(highlightPosition);
    }
    if (event.type === "click") {
      return this.setGridHoverPosition(highlightPosition);
    }
  }

  private setGridSelectionPosition(highlightPosition: THREE.Vector3) {
    this.gridSelection.position.set(
      highlightPosition.x,
      0,
      highlightPosition.z
    );
  }

  private setGridHoverPosition(highlightPosition: THREE.Vector3) {
    this.gridHover.position.set(highlightPosition.x, 0, highlightPosition.z);
  }

  mouseClick(e: MouseEvent) {
    this.findRaycastingIntersect(e);
    if (this.intersects.length > 0) {
      this.makeHighLightVector(this.intersects[0], e);
    }
  }

  mouseMoove(e: MouseEvent) {
    this.findRaycastingIntersect(e);
    if (this.intersects.length > 0) {
      this.makeHighLightVector(this.intersects[0], e);
    }
  }

  setupGrid() {
    this.scene.add(this.grid);
    window.addEventListener("click", (e: MouseEvent) => this.mouseClick(e));
    window.addEventListener("mousemove", (e: MouseEvent) => this.mouseMoove(e));
  }
}
