const GERMAN_WIDTH = 100
const TITLE_WIDTH = 700
const POOP_DIAMETER = 100
const SPEED = 5
const UPPER_BOUND_OFFSET = 200

let poops = []
let position;
let velocity;
let starting;
let counter;
let counterIncrease;

function preload() {
  germanImg = loadImage('./img/Quirky-01.svg')
  poopImg = loadImage('./img/Quirky-02.svg')
  titleImg = loadImage('./img/Quirky-03.svg')
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  imageMode(CENTER)
  counter = 1
  counterIncrease = true
  position = createVector(random(width), random(UPPER_BOUND_OFFSET, height))
  velocity = p5.Vector.random2D().setMag(SPEED)
}

function draw() {
  background(color(61, 147, 239))
  
  position.add(velocity)
  
  if (position.x > width || position.x < 0 || position.y < UPPER_BOUND_OFFSET || position.y > height) {
    const validSpawn = getValidSpawn()
    position = validSpawn.position
    velocity = validSpawn.velocity
  }
  
  for (const poop of poops) {
    image(poopImg, poop.x, poop.y, POOP_DIAMETER, POOP_DIAMETER)
  }
  
  image(germanImg, position.x, position.y, GERMAN_WIDTH, GERMAN_WIDTH)
  

  counter += counterIncrease ? 1 : -1
  
  if (counter >= 100) {
    counterIncrease = false
  }

  if (counter <= 1) {
    counterIncrease = true
  }


  const titleScale = counter / 25
  titleWidth = Math.min(TITLE_WIDTH, TITLE_WIDTH * titleScale)
  titleHeight = Math.min(TITLE_WIDTH * 0.4, TITLE_WIDTH * 0.4 * titleScale)
  image(titleImg, width / 2, UPPER_BOUND_OFFSET * 0.3, titleWidth, titleHeight)

  textSize(28)
  fill(255)
  textAlign(CENTER)
  text('Tap the doggo to make him poop :)', width / 2, UPPER_BOUND_OFFSET * 0.6)

  textSize(16)
  text(`Poop Counter: ${poops.length}`, width / 2, UPPER_BOUND_OFFSET * 0.8)
}

function mouseClicked() {

  if (mouseX > position.x - GERMAN_WIDTH / 2 && 
      mouseX < position.x + GERMAN_WIDTH / 2 && 
      mouseY > position.y - GERMAN_WIDTH /2 && 
      mouseY < position.y + GERMAN_WIDTH / 2) {
    poops.push({ x: position.x, y: position.y })
  }

}

function getRandomRightVelocity() {
  const vector = p5.Vector.random2D()
  
  if (vector.x < 0)
    vector.x *= -1
  
  return vector.normalize().setMag(SPEED)
}

function getRandomLeftVelocity() {
  const vector = p5.Vector.random2D()
  
  if (vector.x > width)
    vector.x *= -1
  
  return vector.normalize().setMag(SPEED)
}

function getRandomUpVelocity() {
  const vector = p5.Vector.random2D()
  
  if (vector.y > height)
    vector.y *= -1
  
  return vector.normalize().setMag(SPEED)
}

function getRandomDownVelocity() {
  const vector = p5.Vector.random2D()
  
  if (vector.y < UPPER_BOUND_OFFSET)
    vector.y *= -1
  
  return vector.normalize().setMag(SPEED)
}

function getValidSpawn() {
  const validSpawns = [
    { position: createVector(0, random(UPPER_BOUND_OFFSET, height)), velocity: getRandomRightVelocity() },
    { position: createVector(width, random(UPPER_BOUND_OFFSET, height)), velocity: getRandomLeftVelocity() },
    { position: createVector(random(width), UPPER_BOUND_OFFSET), velocity: getRandomDownVelocity() },
    { position: createVector(random(width), height), velocity: getRandomUpVelocity() },
  ]
  
  return random(validSpawns)
}
