let power = 100;
let hour = 12;
let animatronicPos = 0; // 0 = far, 3 = attack
let leftDoor = false;
let rightDoor = false;
let camerasOn = false;
let gameOver = false;

const timeEl = document.getElementById("time");
const powerEl = document.getElementById("power");
const messageEl = document.getElementById("message");
const camScreen = document.getElementById("cameraScreen");
const animStatus = document.getElementById("animatronicStatus");

document.getElementById("leftDoor").onclick = () => leftDoor = !leftDoor;
document.getElementById("rightDoor").onclick = () => rightDoor = !rightDoor;

document.getElementById("cameraBtn").onclick = () => {
  camerasOn = true;
  camScreen.style.display = "block";
};

document.getElementById("closeCam").onclick = () => {
  camerasOn = false;
  camScreen.style.display = "none";
};

function updateTime() {
  if (hour === 6) {
    messageEl.innerText = "6 AM - You Survived!";
    gameOver = true;
    return;
  }
  hour++;
  timeEl.innerText = hour + " AM";
}

function drainPower() {
  let drain = 0.2;
  if (leftDoor) drain += 0.3;
  if (rightDoor) drain += 0.3;
  if (camerasOn) drain += 0.5;

  power -= drain;
  powerEl.innerText = "Power: " + Math.floor(power) + "%";

  if (power <= 0) {
    gameOver = true;
    messageEl.innerText = "Power Out... 😱";
  }
}

function moveAnimatronic() {
  if (Math.random() < 0.3) animatronicPos++;
  animatronicPos = Math.min(animatronicPos, 3);

  const stages = ["Far", "Hallway", "Door", "ATTACK"];
  animStatus.innerText = "Animatronic: " + stages[animatronicPos];

  if (animatronicPos === 3) {
    if (!leftDoor && !rightDoor) {
      messageEl.innerText = "JUMPSCARE!";
      gameOver = true;
    } else {
      animatronicPos = 1;
    }
  }
}

setInterval(() => {
  if (gameOver) return;
  drainPower();
}, 1000);

setInterval(() => {
  if (gameOver) return;
  moveAnimatronic();
}, 5000);

setInterval(() => {
  if (gameOver) return;
  updateTime();
}, 15000);
