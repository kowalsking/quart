import {
  Application,
  Sprite,
  Texture,
  DisplayObject,
  LoaderResource,
  Text,
} from "pixi.js";
import Loader from "./Loader";
import Enemy from "./Enemy";

export type Position = {
  x: number;
  y: number;
};

class Game {
  private app: Application;
  private loader: Loader;
  private enemies: Enemy[];
  private text: Text;

  constructor() {
    this.enemies = [];
    this.init();
  }

  init() {
    this.instantiateApp();
    this.createView();
    this.createLoader();
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
    this.loader = new Loader(this.setup.bind(this));
  }

  setup(): void {
    this.setupBackground();
    this.setupEnemies();
    this.setupTicker();
    this.setupKiller();
    this.updateAmountOfEnemies(this.enemies.length);
  }

  setupBackground(): void {
    const bgc: Sprite = new Sprite(this.loader.getTexture("back"));
    this.makeFullScreen(bgc);
    this.append(bgc);
  }

  makeFullScreen(bgc: Sprite) {
    bgc.width = this.app.view.width;
    bgc.height = this.app.view.height;
  }

  setupEnemies(): void {
    const config: LoaderResource = this.loader.getResourse("config");
    const enemies: Position[] = config.data.enemies;
    const textureArray: Texture[] = [];
    const spritesheet: LoaderResource = this.loader.getResourse("spritesheet");
    const alienImages: string[] = Object.keys(spritesheet.data.frames);

    alienImages.forEach((alien) => textureArray.push(Texture.from(alien)));

    enemies.map((pos: Position): void => {
      const bad = new Enemy(pos, textureArray);
      this.enemies.push(bad);
      this.append(bad.body);
    });
  }

  setupTicker(): void {
    this.app.ticker.add(() => {
      this.enemies.forEach((enemy) => {
        enemy.move();
        enemy.checkCollision(this.app.screen.width);
      });
    });
  }

  setupKiller(): void {
    this.enemies.forEach((enemy) => {
      enemy.body.on("pointerdown", () => {
        enemy.kill();
        this.removeFromList(enemy);
        this.updateAmountOfEnemies(this.enemies.length);
      });
    });
  }

  updateAmountOfEnemies(amount: number): void {
    if (this.text) {
      this.remove(this.text);
    }
    this.text = new Text(`Quantity of enemies: ${amount}`, {
      fill: ["#ffffff"],
    });
    this.text.x = 50;
    this.text.y = 50;
    this.append(this.text);
  }

  removeFromList(enemy: Enemy): void {
    this.enemies.forEach((en, idx) => {
      if (en === enemy) {
        this.enemies.splice(idx, 1);
      }
    });
  }

  remove(child: DisplayObject): void {
    this.app.stage.removeChild(child);
  }

  append(child: DisplayObject): void {
    this.app.stage.addChild(child);
  }
}

export default Game;
