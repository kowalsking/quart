import {
  Application,
  Sprite,
  Texture,
  AnimatedSprite,
  DisplayObject,
  LoaderResource,
  Text,
} from "pixi.js";
import Loader from "./Loader";
import Enemy from "./Enemy";

class Game {
  private app: Application;
  private loader: Loader;
  private enemies: Enemy[];

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

  setupBackground(): void {
    const bgc: Sprite = new Sprite(this.loader.getTexture("back"));
    bgc.width = this.app.view.width;
    bgc.height = this.app.view.height;
    this.append(bgc);
  }

  setupEnemies(): void {
    this.enemies = [];
    const config: [{ x: number; y: number }] = this.loader.getResourse("config")
      .data.enemies;
    const textureArray: Texture[] = [];

    const spritesheet: LoaderResource = this.loader.getResourse("spritesheet");

    const alienImages: string[] = Object.keys(spritesheet.data.frames);

    alienImages.forEach((alien) => textureArray.push(Texture.from(alien)));

    config.map((pos: { x: number; y: number }): void => {
      const bad = new Enemy(textureArray);
      this.enemies.push(bad);
      this.append(bad.create(pos));
    });
  }

  setupTicker(): void {
    this.app.ticker.add(() => {
      this.enemies.forEach((enemy) => {
        enemy.move();
        this.checkCollision(enemy);
      });
    });
  }

  checkCollision(enemy: Enemy): void {
    if (enemy.body.x >= this.app.screen.width) {
      enemy.body.x = 0;
    }
  }

  setupKiller() {
    this.app.renderer.plugins.interaction.on("pointerdown", (e: MouseEvent) => {
      console.log(e.target);

      this.enemies.forEach((enemy, idx) => {
        if (e.target instanceof AnimatedSprite) {
          this.enemies.splice(idx, 1);
          enemy.kill();
        }
      });
    });
  }

  setupText(): void {
    const text = new Text(`Quantity of enemies: ${this.enemies.length}`, {
      fill: ["#ffffff"],
    });
    text.x = 50;
    text.y = 50;
    this.append(text);
  }

  setup(): void {
    this.setupBackground();
    this.setupEnemies();
    this.setupTicker();
    this.setupKiller();
    this.setupText();
  }

  append(child: DisplayObject): void {
    this.app.stage.addChild(child);
  }
}

export default Game;
