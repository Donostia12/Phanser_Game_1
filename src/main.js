import "./style.css";

import Phaser, { Physics } from "phaser";

const sizes = {
  height: 800,
  width: 400,
};
const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("this");
  }
  preload() {}
  create() {}
  update() {}
}
const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  width: sizes.width,
  Physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
    },
  },
};

const game = new Phaser.Game(config);
