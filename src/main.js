import "./style.css";
import Phaser from "phaser";

const sizes = {
  height: 786,
  width: 400,
};
const speedDown = 30;
const respawnsarea = 350;
const initialHealth = 3;

class GameScene extends Phaser.Scene {
  constructor() {
    super("this Game ");
    this.player = null;
    this.cursor = null;
    this.playerspeed = 1000 + 50;
    this.target = null;
    this.floor = null;
    this.point = 0;
    this.health = initialHealth;
    this.speedDown = speedDown;
    this.gameOver = false;
  }

  preload() {
    this.load.image("bg", "public/assets/background.png");
    this.load.image("tree", "public/assets/tree.png");
    this.load.image("basket", "public/assets/basket.png");
    this.load.image("apple", "public/assets/apple.png");
  }

  create() {
    this.add
      .image(0, 0, "bg")
      .setOrigin(0.0)
      .setDisplaySize(sizes.width, sizes.height);
    this.add.image(0, 0, "tree").setOrigin(0.0);

    this.player = this.physics.add
      .image(0, 0, "basket")
      .setOrigin(0.0)
      .setScale(0.2);
    this.player.x = 10;
    this.player.y = 550;
    this.player.body.allowGravity = false;
    this.player.body.setSize(250, 50);
    this.player.setCollideWorldBounds(true);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.target = this.physics.add
      .image(0, 0, "apple")
      .setOrigin(0.0)
      .setScale(1.5);
    this.target.body.setSize(25, 25);
    this.target.setVelocityY(this.speedDown);

    this.physics.add.overlap(
      this.target,
      this.player,
      this.targetHit,
      null,
      this
    );

    // Tambahkan objek floor sebagai collider
    this.floor = this.physics.add.staticGroup();
    this.floor
      .create(sizes.width / 2, sizes.height - 10)
      .setSize(sizes.width, 20)
      .setVisible(false);

    // Tambahkan overlap antara apple dan floor untuk mengurangi health
    this.physics.add.overlap(this.target, this.floor, this.appleMissed, null, this);
  }

  update() {
    if (this.gameOver) return;

    if (this.target.y >= sizes.height) {
      this.target.setY(0);
      this.target.setX(this.getRandomx());
      this.target.setVelocityY(this.speedDown);
    }

    const { left, right } = this.cursor;

    if (left.isDown) {
      this.player.setVelocityX(-this.playerspeed);
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerspeed);
    } else {
      this.player.setVelocityX(0);
    }
  }

  getRandomx() {
    return Math.floor(Math.random() * respawnsarea);
  }

  targetHit() {
    this.target.setY(0);
    this.target.setX(this.getRandomx());
    this.point++;
    document.getElementById("point").innerText = `Points: ${this.point}`;
  }

  appleMissed() {
    this.health--;
    console.log(`Health: ${this.health}`);
    if (this.health <= 0) {
      console.log("Game Over");
      this.gameOver = true;
      this.showGameOver();
      document.getElementById("point").innerText = `Points: ${this.point}`;
    } else {
      this.target.setY(0);
      this.target.setX(this.getRandomx());
      this.target.setVelocityY(this.speedDown);
    }
  }

  showGameOver() {
    document.getElementById("finalScore").innerText = this.point;
    const modal = document.getElementById("gameOverModal");
    modal.style.display = "block";
  }
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
      debug: true,
    },
  },
  scene: GameScene,
};

const game = new Phaser.Game(config);

window.restartGame = function() {
  const modal = document.getElementById("gameOverModal");
  modal.style.display = "none";
  game.scene.scenes[0].scene.restart();
  game.scene.scenes[0].gameOver = false; // Reset gameOver flag
};

document.getElementById("restartButton").onclick = function() {
  window.restartGame();
}

document.getElementById("closeModal").onclick = function() {
  const modal = document.getElementById("gameOverModal");
  modal.style.display = "none";
};