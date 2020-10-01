import { Application, Sprite, Texture, AnimatedSprite } from "pixi.js";
import Loader from "./Loader";
import * as enemies from "../assets/enemies.json";
// import * as spritesheet from "../assets/spritesheet.json";
import Enemy from "./Enemy";

class Game {
  private app: Application;
  private loader: Loader;

  constructor() {
    this.init();
  }

  init() {
    this.instantiateApp();
    this.createView();
    this.createLoader();
    this.loadAssets();
  }

  instantiateApp(): void {
    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  createView(): void {
    document.body.appendChild(this.app.view);
  }

  createLoader(): void {
    this.loader = new Loader();
  }

  loadAssets(): void {
    this.loader.loadAssets(this.setup.bind(this));
  }

  setup(): void {
    const texture = this.loader.getTexture("back");
    const bgc = new Sprite(texture);
    bgc.width = this.app.view.width;
    bgc.height = this.app.view.height;
    this.app.stage.addChild(bgc);

    const config = JSON.parse(JSON.stringify(enemies));
    const enemyTexture = this.loader.getTexture("hero");
    const enemy = new Enemy();

    config.default.enemies.map((pos: { x: number; y: number }): void => {
      this.app.stage.addChild(enemy.new(pos, enemyTexture));
    });

    const spritesheet = this.loader.getResourse("spritesheet");

    const alienImages = Object.keys(spritesheet.data.frames);

    let textureArray = [];

    for (let i = 0; i < 4; i++) {
      let texture = Texture.from(alienImages[i]);
      textureArray.push(texture);
    }

    let animatedSprite = new AnimatedSprite(textureArray);

    animatedSprite.x = this.app.screen.width / 2;
    animatedSprite.y = this.app.screen.height / 2;
    animatedSprite.anchor.set(0.5);
    animatedSprite.animationSpeed = 0.2;
    animatedSprite.play();

    this.app.stage.addChild(animatedSprite);

    this.app.ticker.add(() => {
      animatedSprite.x += 3;
      if (animatedSprite.x >= this.app.screen.width) {
        animatedSprite.x = 0;
      }
    });
  }
}

export default Game;
