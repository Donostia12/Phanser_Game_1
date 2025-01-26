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
    this.load.image('bg', 'public/assets/bg.png');
  }
  create() {
    this.add.image(240, 360, 'bg'); // Sesuaikan posisi gambar dengan ukuran canvas
  }
  update() {}
}
const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gamecanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug:true
    },
  },
  scene: GameScene ,
};


const game = new Phaser.Game(config);
