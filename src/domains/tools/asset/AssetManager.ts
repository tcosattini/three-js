import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import viteConfig from "../../../../vite.config";

const baseUrl = viteConfig.base;

export class AssetManager {
  textureLoader = new THREE.TextureLoader();
  modelLoader = new GLTFLoader();
  textures = {
    grid: this.loadTexture(`${baseUrl}textures/grid.png`),
  };

  loadTexture(url: string) {
    const texture = this.textureLoader.load(url);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
    return texture;
  }
}
