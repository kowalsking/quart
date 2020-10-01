import { Texture, AnimatedSprite, DisplayObject } from "pixi.js";

export default class Enemy {
  body: AnimatedSprite;

  constructor(private textureArray: Texture[]) {
    this.textureArray = textureArray;
    this.body = new AnimatedSprite(this.textureArray);
  }

  create(pos: { x: number; y: number }): DisplayObject {
    this.body.x = pos.x;
    this.body.y = pos.y;
    this.body.anchor.set(0.5);
    this.body.animationSpeed = 0.2;
    this.body.interactive = true;
    this.body.buttonMode = true;
    this.body.play();

    return this.body;
  }

  move(): void {
    this.body.x += 3;
  }

  kill(): void {
    this.body.destroy();
  }
}
