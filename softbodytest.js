// softbody test with p5play
"use strict";

// objects
let blobbers, ground;

// joints
let joints = [], mousegrab;

function makeJoint(a, b, s) {
  const j = new DistanceJoint(a, b);
  j.springiness = s ?? 0.1;
  j.collideConnected = true;
  // j.visible = false;
  joints.push(j);
}

function setup() {
  new Canvas();
  world.gravity.y = 10;

  ground = new Sprite(0, 160, 5000, 20, 's');

  blobbers = new Group();
  blobbers.diameter = 10;
  blobbers.fill = color(0,0,0,0);
  // blobbers.amount = 2;

  new blobbers.Sprite(-50, -50);
  new blobbers.Sprite(50, -50);
  new blobbers.Sprite(0, 0);
  new blobbers.Sprite(-50, 50);
  new blobbers.Sprite(50, 50);
  makeJoint(blobbers[0], blobbers[1]);
  makeJoint(blobbers[0], blobbers[2], 0);
  makeJoint(blobbers[1], blobbers[2], 0);
  makeJoint(blobbers[3], blobbers[4]);
  makeJoint(blobbers[3], blobbers[0]);
  makeJoint(blobbers[4], blobbers[1]);
  makeJoint(blobbers[3], blobbers[2], 0);
  makeJoint(blobbers[4], blobbers[2], 0);
}

function update() {
  background(50);

  stroke(255);
  strokeWeight(2);

  // mousegrab
  if(mouse.presses()) {
    let s = world.getSpriteAt(mouse);
    if(s) {
      mousegrab = new GrabberJoint(s);
      mousegrab.maxForce = 100000;
    }
  }

  if(mouse.pressing() && mousegrab) mousegrab.target = mouse;
  if(mouse.released() && mousegrab) mousegrab.remove();
}

function drawFrame() {
  camera.pos = { x: 0, y: 0 };

  camera.on();
  beginShape();
  vertex(blobbers[0].x, blobbers[0].y);
  vertex(blobbers[1].x, blobbers[1].y);
  vertex(blobbers[4].x, blobbers[4].y);
  vertex(blobbers[3].x, blobbers[3].y);
  endShape();
}

function windowResized() {
  canvas.resize(windowWidth, windowHeight);
}