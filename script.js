const boatBtns = document.querySelectorAll(".boat");
const cannibleBtns = document.querySelectorAll(".cannible");
const monkBtns = document.querySelectorAll(".monk");
const resetBtn = document.querySelector(".resetBtn");
const leftCannible = document.querySelectorAll(".leftCannible");
const leftMonk = document.querySelectorAll(".leftMonk");
const rightCannible = document.querySelectorAll(".rightCannible");
const rightMonk = document.querySelectorAll(".rightMonk");
const victory = document.querySelector(".victory");
const defeat = document.querySelector(".defeat");
const lc = document.querySelector(".lc");
const lm = document.querySelector(".lm");
const rc = document.querySelector(".rc");
const rm = document.querySelector(".rm");
const bt = document.querySelector(".bt");
const image = document.querySelector(".image");

// boat = 0 implies boat is on left side
// boat = 1 implies boat is on right side

let boat = 1,
  cannibleLeft = 0,
  cannibleRight = 3,
  monkLeft = 0,
  monkRight = 3,
  monkOnBoat = 0,
  cannibleOnBoat = 0,
  win = false,
  valid = true;

lc.innerText = cannibleLeft;
lm.innerText = monkLeft;
rc.innerText = cannibleRight;
rm.innerText = monkRight;
bt.innerText = `Cannibles: ${cannibleOnBoat} Monks: ${monkOnBoat}`;
// This function will move a cannilbe from boat to the other side
function moveCannible() {
  if (boat == 0) {
    cannibleLeft--;
    cannibleRight++;
  } else {
    cannibleRight--;
    cannibleLeft++;
  }
}

// This function will move a monk from boat to the other side
function moveMonk() {
  if (boat == 0) {
    monkLeft--;
    monkRight++;
  } else {
    monkRight--;
    monkLeft++;
  }
}

// This function will move a monk from a side to the boat
function moveMonkToBoat() {
  if (boat == 0) {
    if (monkLeft > 0) {
      monkOnBoat++;
    }
  } else {
    if (monkRight > 0) {
      monkOnBoat++;
    }
  }
  bt.innerText = `Cannibles: ${cannibleOnBoat} Monks: ${monkOnBoat}`;
}

// This function will move a cannilbe from a side to the boat
function moveCannibleToBoat() {
  if (boat == 0) {
    if (cannibleLeft > 0) {
      cannibleOnBoat++;
    }
  } else {
    if (cannibleRight > 0) {
      cannibleOnBoat++;
    }
  }
  bt.innerText = `Cannibles: ${cannibleOnBoat} Monks: ${monkOnBoat}`;
}

// This function will move the boat from one side to other and move the passengers to the other side
function moveBoat() {
  if (monkOnBoat > 0 || cannibleOnBoat > 0) {
    for (let i = 0; i < monkOnBoat; i++) {
      moveMonk();
    }
    monkOnBoat = 0;
    for (let i = 0; i < cannibleOnBoat; i++) {
      moveCannible();
    }
    cannibleOnBoat = 0;
    if (boat == 0) {
      rightCannible.forEach((btn) => {
        btn.style.display = "none";
      });
      rightMonk.forEach((btn) => {
        btn.style.display = "none";
      });
      for (let i = 0; i < cannibleRight; i++) {
        rightCannible[i].style.display = "inline-block";
      }
      for (let i = 0; i < monkRight; i++) {
        rightMonk[i].style.display = "inline-block";
      }
      boat = 1;
    } else {
      leftCannible.forEach((btn) => {
        btn.style.display = "none";
      });
      leftMonk.forEach((btn) => {
        btn.style.display = "none";
      });
      for (let i = 0; i < cannibleLeft; i++) {
        leftCannible[i].style.display = "inline-block";
      }
      for (let i = 0; i < monkLeft; i++) {
        leftMonk[i].style.display = "inline-block";
      }
      boat = 0;
    }
    console.log(cannibleLeft, monkLeft, boat, cannibleRight, monkRight);
    valid = check();
    win = checkWin();
    if (win) {
      victory.style.display = "inline-block";
    } else if (!valid) {
      defeat.style.display = "inline-block";
    }
    lc.innerText = cannibleLeft;
    lm.innerText = monkLeft;
    rc.innerText = cannibleRight;
    rm.innerText = monkRight;
  }
}

// This function will check if the cannibles can eat the monks or not
function check() {
  if (monkLeft > 0 && monkLeft < cannibleLeft) {
    return false;
  }
  if (monkRight > 0 && monkRight < cannibleRight) {
    return false;
  }
  return true;
}

// This function will check if the game is won or not
function checkWin() {
  if (monkRight == 0 && cannibleRight == 0) {
    return true;
  }
  return false;
}

// This function will reset the game
function reset() {
  boat = 1;
  cannibleLeft = 0;
  cannibleRight = 3;
  monkLeft = 0;
  monkRight = 3;
  monkOnBoat = 0;
  cannibleOnBoat = 0;
  win = false;
  valid = true;
  victory.style.display = "none";
  defeat.style.display = "none";
  leftCannible.forEach((btn) => {
    btn.style.display = "none";
  });
  leftMonk.forEach((btn) => {
    btn.style.display = "none";
  });
  rightCannible.forEach((btn) => {
    btn.style.display = "inline-block";
  });
  rightMonk.forEach((btn) => {
    btn.style.display = "inline-block";
  });
  lc.innerText = cannibleLeft;
  lm.innerText = monkLeft;
  rc.innerText = cannibleRight;
  rm.innerText = monkRight;
  bt.innerText = `Cannibles: ${cannibleOnBoat} Monks: ${monkOnBoat}`;
}

boatBtns.forEach((btn) => {
  btn.addEventListener("click", moveBoat);
  btn.addEventListener("click", () => {
    if (boat == 0) {
      image.classList.remove("img2");
      image.classList.add("img1");
    } else {
      image.classList.remove("img1");
      image.classList.add("img2");
    }
  });
});

cannibleBtns.forEach((btn) => {
  btn.addEventListener("click", moveCannibleToBoat);
  btn.addEventListener("click", () => {
    btn.style.display = "none";
  });
});

monkBtns.forEach((btn) => {
  btn.addEventListener("click", moveMonkToBoat);
  btn.addEventListener("click", () => {
    btn.style.display = "none";
  });
});

resetBtn.addEventListener("click", () => {
  reset();
});
