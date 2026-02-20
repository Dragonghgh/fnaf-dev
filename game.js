let power = 100;
let hour = 12;
let animatronicPos = 0;
let doors = { left: false, right: false };

const positions = ["Stage", "Dining Area", "Hallway", "Door"];

const powerEl = document.getElementById("power");
const timeEl = document.getElementById("time");
const camText = document.getElementById("animatronicLocation");
const gameOver = document.getElementById("gameOver");

document.getElementById("leftDoor").onclick = () => toggleDoor("left");
document.getElementById("rightDoor").onclick = () => toggleDoor("right");

document.getElementById("cameraBtn").onclick = () =>
  document.getElementById("cameraView").classList.remove("hidden");

document.getElementById("closeCam").onclick = () =>
  document.getElementById("cameraView").classList.add("hidden");

function toggleDoor(side) {
  doors[side] = !doors[side];
}

function drainPower() {
  let usage = 1;
  if (doors.left) usage++;
  if (doors.right) usage++;
  power -= usage;
  powerEl.textContent = power;

  if (power <= 0) endGame();
}

function moveAnimatronic() {
  if (Math.random() > 0.6 && animatronicPos < positions.length - 1) {
    animatronicPos++;
  }

  camText.textContent = "Animatronic: " + positions[animatronicPos];

  if (positions[animatronicPos] === "Door") {
    if (!doors.left && !doors.right) {
      endGame();
    } else {
      animatronicPos = 0;
    }
  }
}

function updateTime() {
  hour++;
  if (hour === 6) {
    alert("You survived the night!");
    location.reload();
  }
  timeEl.textContent = hour + " AM";
}

function endGame() {
  gameOver.classList.remove("hidden");
  clearInterval(gameLoop);
}

const gameLoop = setInterval(() => {
  drainPower();
  moveAnimatronic();
}, 3000);

setInterval(updateTime, 60000);
