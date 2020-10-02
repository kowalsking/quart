import { Loader as PixiLoader, LoaderResource, Texture } from "pixi.js";

export default class Loader {
  loader: PixiLoader;

  constructor(onAssetsLoad: () => void) {
    this.loader = new PixiLoader();
    this.loader.add("back", "/assets/img/background.jpg");
    this.loader.add("hero", "/assets/img/hero.png");
    this.loader.add("spritesheet", "../assets/spritesheet.json");
    this.loader.add("config", "../assets/enemies.json");
    this.loader.load(() => onAssetsLoad());
  }

  getTexture(name: string): Texture {
    return this.loader.resources[name].texture;
  }

  getResourse(name: string): LoaderResource {
    return this.loader.resources[name];
  }
}
