"use strict";

const discCount = 100;

// tower sprites
let solid, towers;
let tower1, tower2, tower3, base;

let discs;

let mousegrab;

function setup() {
  new Canvas();
  // world.gravity.y = 10;

  // tower group properties
  solid = new Group();
  solid.fill = "grey";
  solid.stroke = color(0, 0, 0, 0);
  solid.width = 20;
  solid.height = 300;
  solid.collider = "s";
  towers = new solid.Group();
  base = new solid.Sprite(0, 160, 800, 20);

  // create tower sprites
  tower1 = new towers.Sprite(-300, 0);
  tower2 = new towers.Sprite(0, 0);
  tower3 = new towers.Sprite(300, 0);

  // "disc" group properties
  discs = new Group();
  // discs.rotationLock = true;
  discs.x = 0;
  discs.y = -400;

  // disc overlappery thing?
  discs.overlapping(towers, (d, t) => {
    d.x = t.x;
  });
}

function update() {
  background(50);

  stroke(255);
  strokeWeight(2);

  if(mouse.presses()) {
    let s = world.getSpriteAt(mouse);
    if(s) {
      mousegrab = new GrabberJoint(s);
      mousegrab.maxForce = 100000;
    }
  }

  if(mouse.pressing() && mousegrab) mousegrab.target = mouse;
  if(mouse.released() && mousegrab) mousegrab.remove();

  discs.cull(500);
  discs.amount = discCount;
  // discs.repelFrom(discs[0], 50);
  for(let d of discs) {
    discs.attractTo(d, 0.1);
  }
}

function drawFrame() {
  camera.pos = { x: 0, y: -100 };
}

function windowResized() {
  canvas.resize(windowWidth, windowHeight);
}

function calcZoom() {

}