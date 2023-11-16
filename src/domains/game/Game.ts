import { SceneManager } from "../tools/scene/SceneManager";

export class Game {
  sceneManager: SceneManager;
  constructor() {
    this.sceneManager = new SceneManager();
  }
}
