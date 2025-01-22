"use strict";

const discCount = 3;

// tower sprites
let towers;
let tower1, tower2, tower3, base;

let discs;

let mousegrab;

function setup() {
  new Canvas();
  world.gravity.y = 10;

  // tower group properties
  towers = new Group();
  towers.fill = "grey";
  towers.stroke = color(0, 0, 0, 0);
  towers.width = 20;
  towers.height = 300;
  towers.collider = "none";

  // create tower sprites
  tower1 = new towers.Sprite(-300, 0);
  tower2 = new towers.Sprite(0, 0);
  tower3 = new towers.Sprite(300, 0);
  base = new towers.Sprite(0, 160, 800, 20, "s");

  // "disc" group properties
  discs = new Group();
  discs.rotationLock = true;
  discs.x = -300;
  discs.y = -400;

  // create disc sprites
}

function update() {
  background(50);
  camera.pos = { x: 0, y: 0 };

  stroke(255);
  strokeWeight(2);

  if(mouse.presses()) {
    let s = world.getSpriteAt(mouse);
    if(s) {
      mousegrab = new GrabberJoint(s);
      mousegrab.maxForce = 1000;
    }
  }

  if(mouse.pressing() && mousegrab) mousegrab.target = mouse;
  if(mouse.released() && mousegrab) mousegrab.remove();

  discs.cull(500);
  discs.amount = discCount;
}

function windowResized() {
  canvas.resize(windowWidth, windowHeight);
}