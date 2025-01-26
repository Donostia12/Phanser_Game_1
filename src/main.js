import "./style.css";

import Phaser, { Physics, Scene } from "phaser";

const sizes = {
  height: 720,
  width: 480,
};
const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("this Game ");
  }
  preload() {
    this.load.image("logo", "/assets/Logo.ico");
  }
  create() {
    this.add.image(0, 0, "logo");
  }
  update() {}
}
const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gamecanvas,
  Physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug:true
    },
  },
  Scene: { GameScene },
};

const game = new Phaser.Game(config);
