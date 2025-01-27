import "./style.css";

import Phaser, { LEFT, Physics, RIGHT, Scene } from "phaser";

const sizes = {
  height: 786,
  width: 400,
};
const speedDown = 30;
const respawnsarea= 390;

class GameScene extends Phaser.Scene {
  constructor() {
    super("this Game ");
    this.player
    this.cursor
    this.playerspeed = 1000+ 50
    this.target 
    this.point = 0
  }
  preload() {
    this.load.image('bg','public/assets/background.png')
    this.load.image('tree', 'public/assets/tree.png')
    this.load.image('basket','public/assets/basket.png')
    this.load.image('apple','public/assets/apple.png')
  }
  create() {
    // Tambahkan gambar latar belakang dan sesuaikan ukurannya dengan kanvas
    this.add.image(0, 0, 'bg').setOrigin(0.0).setDisplaySize(sizes.width, sizes.height);
    this.add.image(0, 0, 'tree').setOrigin(0.0);
    this.player = this.physics.add.image(0, 0, 'basket').setOrigin(0.0).setScale(0.2);
    this.player.x = 10
    this.player.y = 550
    this.player.body.allowGravity = false;
    this.player.body.allowGravity  =false
    this.cursor = this.input.keyboard.createCursorKeys()
    
    this.target = this.physics.add
    .image(0, 0, 'apple')
    .setOrigin(0.0)
    .setScale(1.5);
    this.physics.add.overlap(this.target,this.player,this.targetHit,null,this)
  }
  update() {

    if (this.target.y >= sizes.height) {
        this.target.setY(0);
        this.target.setX(this.getRandomx())
        this.target.setVelocityY(this.speedDown);
    }
    console.log(this.point);
    const {left,right} = this.cursor


    if (left.isDown) {
      this.player.setVelocityX(-this.playerspeed)
    }else if(right.isDown){
      this.player.setVelocityX(this.playerspeed)
    }else{
      this.player.setVelocityX(0)
    }
  }
  getRandomx(){
    return Math.floor(Math.random()*respawnsarea);
  }
  targetHit(){
    this.target.setY(0)
    this.target.setX(this.getRandomx())
    this.point++
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
      debug: true
    },
  },
  scene: GameScene ,
};

const game = new Phaser.Game(config);