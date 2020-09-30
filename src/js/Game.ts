import { Application, Loader, Sprite } from "pixi.js";

class Game {
  private app: Application;
  private loader: Loader;

  constructor() {
    this.instantiateApp();
    this.createView();
    this.loadAssets();
  }

  instantiateApp(): void {
    this.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb, // light blue
    });
  }

  createView(): void {
    document.body.appendChild(this.app.view);
  }

  loadAssets(): void {
    this.loader = new Loader();
    this.loader.add("back", "/assets/img/back.png");
    this.loader.load(() => {
      this.setup();
    });
  }

  setup(): void {
    const bgc = new Sprite(this.loader.resources["back"].texture);
    bgc.width = this.app.view.width;
    bgc.height = this.app.view.height;
    this.app.stage.addChild(bgc);
  }
}

export default Game;
