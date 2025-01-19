import "./style.css";

import Phaser from "phaser";

const sizes = {
  height: 800,
  width: 400,
};
const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  width: sizes.width,
};

const game = new Phaser.Game(config);
