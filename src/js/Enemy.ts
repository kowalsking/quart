import { Texture, Sprite, DisplayObject } from "pixi.js";

export default class Enemy {
  hero: Sprite;

  new(pos: { x: number; y: number }, heroText: Texture): DisplayObject {
    this.hero = new Sprite(heroText);
    this.hero.position.x = pos.x;
    this.hero.position.y = pos.y;
    this.hero.anchor.x = 0.5;
    this.hero.anchor.y = 0.5;
    this.hero.interactive = true;
    this.hero.buttonMode = true;
    this.hero.addListener("click", (e: MouseEvent) =>
      e.target instanceof Sprite ? e.target.destroy() : null
    );
    return this.hero;
  }
}
