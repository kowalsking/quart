import { Texture, AnimatedSprite, DisplayObject } from "pixi.js";
import type { Position } from "./Game";

export default class Enemy {
  body: AnimatedSprite;

  constructor(private pos: Position, private textureArray: Texture[]) {
    this.pos = pos;
    this.textureArray = textureArray;
    this.create(this.pos);
  }

  create(pos: Position): DisplayObject {
    this.body = new AnimatedSprite(this.textureArray);
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

  checkCollision(border: number): void {
    if (this.body.x >= border) {
      this.body.x = 0;
    }
  }

  kill(): void {
    this.body.destroy();
  }
}
