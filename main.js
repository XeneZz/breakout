let isClearLevelCalled = false;

//////////////////////
let musicMenu = new Audio();
let click = new Audio();
click.src = "assets/click.wav";
musicMenu.src = "assets/musicMenu.mp3";
document.querySelector(".bloc").addEventListener("click", () => {
  musicMenu.play();
});

let levelMusic = new Audio();
levelMusic.src = "assets/levelMusic.mp3";
levelMusic.loop = true;
///////////////////////////////
//Settings
const set = document.getElementById("set");
const setPage = document.getElementById("setPage");

let isSetPageOpen = false;
set.addEventListener("click", () => {
  if (!isSetPageOpen) {
    click.play();
    set.src = "assets/setLocked.png";
    isSetPageOpen = true;
    setPage.style.display = "block";
  } else {
    click.play();
    set.src = "assets/set.png";
    isSetPageOpen = false;
    setPage.style.display = "none";
  }
});

const closeSet = document.getElementById("closeSet");

closeSet.addEventListener("click", () => {
  click.play();
  set.src = "assets/set.png";
  isSetPageOpen = false;
  setPage.style.display = "none";
});

//Volume
const range = document.getElementById("range");
const textSet = document.getElementById("textSet");
function manageVolumeMenu() {
  musicMenu.volume = range.value / 100;
  textSet.textContent = range.value + "%";
  range.style.background = `linear-gradient(to right, #127b18 ${range.value}%, #127b18 ${range.value}%, transparent ${range.value}%, transparent 100%)`;
}

range.addEventListener("input", manageVolumeMenu);

//Music pause
const musicSet = document.getElementById("musicSet");
musicSet.addEventListener("click", () => {
  if (!musicMenu.paused) {
    musicMenu.pause();
    musicSet.src = "assets/musicLocked.png";
  } else {
    musicMenu.play();
    musicSet.src = "assets/music.png";
  }
});
////////////////////////////////
function menu(styleOne, styleTwo) {
  document.querySelector("form").style.display = "block";
  const title = document.getElementById("title");
  const play = document.getElementById("play");
  const body = document.querySelector("body");
  const getVidBg = document.querySelector(".bloc");
  const pause = document.getElementById("pause");
  const levelanime = document.getElementById("levelanime");
  const firstLine = document.getElementById("first-line");
  const secLine = document.getElementById("sec-line");
  getVidBg.style.display = "block";
  title.style.display = `${styleOne}`;
  play.style.display = `${styleTwo}`;
  set.style.display = "block";
  play.addEventListener("click", () => {
    levelMusic.play();
    musicMenu.pause();
    click.play();
    levelanime.style.display = "block";
    setTimeout(() => {
      firstLine.style.transform = "translateX(0px)";
      secLine.style.transform = "translateX(0px)";
      firstLine.style.opacity = "1";
      secLine.style.opacity = "1";
    }, 100);

    set.style.display = "none";
    getVidBg.style.display = "none";
    title.style.display = "none";
    play.style.display = "none";
    document.querySelector("form").style.display = "none";

    body.style.backgroundImage = "url('assets/spacebg.jpg')";
    isClearLevelCalled = false;
    body.style.backdropFilter = "blur(6px)";
    pause.style.display = "block";

    setTimeout(() => {
      firstLine.style.transform = "translateY(-400px)";
      secLine.style.transform = "translateY(-400px)";
      firstLine.style.opacity = "0";
      secLine.style.opacity = "0";
      setTimeout(() => {
        levelanime.style.display = "none";
      }, 2000);

      levelOne("block", "block");
      pause.style.transform = "translateX(0px)";
    }, 3000);
  });
}
menu();
////////////////////////////////
let correctPassword = "dxcp";
let isCorrect;

const checkpw = document.getElementById("check");
checkpw.addEventListener("click", function checkPassword() {
  let input = document.getElementById("password").value;
  if (input === correctPassword) {
    isCorrect = true;
  } else {
    alert("Mot de passe incorrect!");
    isCorrect = false;
  }
});

////////////////////////////
let brickCount = 0;
let brique;

function generateBricks() {
  if (brickCount > 0) {
    console.log("Bricks already generated!");
    return;
  }
  brickCount = 90;
  let allPatern = document.querySelectorAll("div.patern");
  for (let i = 0; i < allPatern.length; i++) {
    allPatern[i].style.display = "block";
    if (i !== 0) {
      allPatern[i].style.marginTop = "30px";
    }
    allPatern[i].style.display = "flex";
    allPatern[i].style.justifyContent = "center";
    allPatern[i].style.gap = "10px";
    allPatern[i].style.height = "50px";
  }

  let allPaternC = document.querySelectorAll(".paternC");
  for (let i = 0; i < allPaternC.length; i++) {
    allPaternC[i].style.display = "block";

    // if (i !== 0) {
    //   allPaternC[i].style.marginTop = "30px";
    // }
    allPaternC[i].style.display = "flex";
    allPaternC[i].style.flexDirection = "column";
    allPaternC[i].style.alignItem = "center";
    allPaternC[i].style.gap = "15px";
    allPaternC[i].style.height = "900px";
  }

  //Number of patern
  for (let a = 0; a < 2; a++) {
    //Number of brick per Patern
    for (let i = 0; i < 10; i++) {
      // let brick = document.createElement("div");
      // brick.className = "brique";
      const brickColor = [
        "gray",
        "gray",
        "skyBlue",
        "red",
        "gray",
        "skyBlue",
        "gray"
      ];
      let brick = new Image();
      brick.src = `assets/${brickColor[a]}Brick.png`;
      brick.className = "brique";
      allPaternC[a].appendChild(brick);
    }
  }

  //Number of patern
  for (let a = 0; a < 7; a++) {
    //Number of brick per Patern
    for (let i = 0; i < 10; i++) {
      // let brick = document.createElement("div");
      // brick.className = "brique";
      const brickColor = [
        "yellow",
        "green",
        "skyBlue",
        "red",
        "green",
        "skyBlue",
        "yellow"
      ];
      let brick = new Image();
      brick.src = `assets/${brickColor[a]}Brick.png`;
      brick.className = "brique";
      allPatern[a].appendChild(brick);
    }
  }
}

///////////////////////////////////////////////
let left = window.innerWidth / 2;
function levelOne(styleOne, styleTwo) {
  //Life
  let lifes = 3;
  const isLifeAlreadyHere = document.querySelectorAll(".lifes");
  if (isLifeAlreadyHere.length === 0) {
    for (let i = 0; i < lifes; i++) {
      let img = new Image();
      img.src = "assets/life.png";
      document.body.appendChild(img);
      img.classList.add("life-" + i, "lifes");
      setTimeout(() => {
        img.style.transform = "translateX(0px)";
      }, 500);

      document.body.appendChild(img);
    }
  }
  //Life animation when life lost

  function lifeLostAnimation(i) {
    const getLifes = document.querySelectorAll(".lifes");
    getLifes[i].style.transform = "translateY(200px)";
    getLifes[i].style.opacity = "0";
  }

  //sound
  const sound = {
    sonbrique: new Audio()
  };

  //bar style
  const bar = document.getElementById("bar");
  const pad = {
    w: 160,
    h: 40,
    bottom: 100
  };
  bar.style.display = `${styleTwo}`;

  bar.style.position = "absolute";
  bar.style.bottom = `${pad.bottom}px`;
  bar.style.transform = "translateY(150px)";
  bar.style.transition = "transform 2s";
  setTimeout(() => {
    bar.style.transform = "translate(-50%, -50%)";
  }, 100);
  bar.style.width = `${pad.w}px`;
  bar.style.height = `${pad.h}px`;
  bar.style.zIndex = "1";

  // Bar control

  const PAS = 10;

  const keyPressed = {
    left: false,
    right: false,
    space: false
  };

  document.onkeydown = function (event) {
    if (event.keyCode === 37) {
      keyPressed.left = true;
    } else if (event.keyCode === 39) {
      keyPressed.right = true;
    } else if (event.keyCode === 32) {
      keyPressed.space = true;
    }
  };

  document.onkeyup = function (event) {
    if (event.keyCode === 37) {
      keyPressed.left = false;
    } else if (event.keyCode === 39) {
      keyPressed.right = false;
    } else if (event.keyCode === 32) {
      keyPressed.space = false;
    }
  };
  let isBarmove = true;
  function barmove() {
    if (left > pad.w / 2 && left < window.innerWidth - pad.w / 2) {
      if (keyPressed.left) {
        left -= PAS;
      } else if (keyPressed.right) {
        left += PAS;
      }
      bar.style.left = `${left}px`;
    } else if (left <= pad.w / 2) {
      if (keyPressed.right) {
        left += PAS;
        bar.style.left = `${left}px`;
      }
    } else if (left >= window.innerWidth - pad.w / 2) {
      if (keyPressed.left) {
        left -= PAS;
        bar.style.left = `${left}px`;
      }
    }
    if (isBarmove) {
      requestAnimationFrame(barmove);
    }
  }
  requestAnimationFrame(barmove);

  ///////////////////////////////
  // Ball boucing on wall, pad, brique

  generateBricks();

  const briqueSetting = {
    w: 80,
    h: 40,
    color: "red",
    top: 50
  };

  const brique = document.querySelectorAll("img.brique");
  for (let i = 0; i < brique.length; i++) {
    brique[i].style.width = `${briqueSetting.w}px`;
    brique[i].style.height = `${briqueSetting.h}px`;
    brique[i].style.backgroundColor = `${briqueSetting.color}`;
    brique[i].style.top = `${briqueSetting.top}px`;
    brique[i].style.position = "relative";
    // console.log(`Position de l'élément ${i}: (${briqueLeft}, ${briqueTop})`);
  }
  //Remaining brick
  const isRemainBrickHere = document.querySelectorAll(".brickRemain-style");
  if (isRemainBrickHere.length > 0) {
    isRemainBrickHere.forEach(function (all) {
      all.remove();
    });
  }
  const brickRemain = document.createElement("div");
  brickRemain.classList.add("brickRemain-style");
  setTimeout(() => {
    brickRemain.style.transform = "translatey(0px)";
  }, 100);

  function changeBrickRemain() {
    brickRemain.textContent = `${brickCount}/50`;
    document.body.appendChild(brickRemain);
  }
  changeBrickRemain();

  //Ball creation
  const ball = document.getElementById("ball");

  let b = {
    x: left - 45 / 2,
    y: 0,
    w: 25,
    h: 25,
    dx: 1,
    dy: 1,
    speed: 5, //speed de base : 4
    ani: {},
    move: false,
    follow: true,
    audiomur: new Audio(),
    audiopad: new Audio()
  };

  ball.style.display = "block";
  ball.style.left = `${b.x}px`;
  ball.style.top = `${b.y}px`;
  ball.style.width = `${b.w}px`;
  ball.style.height = `${b.h}px`;
  ball.style.position = "absolute";

  /////////////////
  //Boost Setting
  let sheildSetting = {
    w: 50,
    h: 45
  };
  let boost = {
    x: 0,
    y: 0,
    w: 70,
    h: 25
  };

  /////////////////
  //Ball move + collision

  let ballInGame = 0;
  let firstBallInGame = true;
  let points = 0;
  let bonus = 0;
  let bonusStreak = 0;
  let isBonusMove = false;
  let isGodBallActive = false;
  let boostChoosen;
  let isSheildActive = false;
  const boostList = [
    "life",
    "sheild",
    "slowerball",
    "fasterball",
    "laserpad",
    "reducepad",
    "godball",
    "longerpad",
    "multiplier"
  ]; //"life","sheild", "slowerball", "fasterball", "laserpad", "reducepad", "godball", "longerpad", "multiplier"
  let timestampInitial;
  function mover(timestamp) {
    if (!timestampInitial) {
      timestampInitial = timestamp;
    }

    const tempsEcoule = timestamp - timestampInitial;
    console.log("tempsEcoule", tempsEcoule);

    timestampInitial = timestamp;

    const timetstampAlgoDepart = window.performance.now();

    let THRESHOLD = 1;

    b.x += b.dx * b.speed;
    b.y += b.dy * b.speed;

    let previousPoints = points;
    ///////////////////////////
    //Rebond raquette
    if (
      b.dy > 0 &&
      b.y + b.h * 2 > window.innerHeight - pad.bottom - pad.h &&
      b.y + b.h < window.innerHeight - pad.bottom &&
      b.x + b.w > left - pad.w / 2 &&
      b.x < left + pad.w / 2
    ) {
      let distance = Math.abs(b.x - left); // calcul de la distance entre la balle et le milieu de la raquette
      if (distance > THRESHOLD) {
        // vérifie si la distance est supérieure à un certain seuil
        b.dy *= -1;
        b.audiopad.src = "assets/sonball.mp3";
        b.audiopad.play();
        bonus = 0;
        let offset = b.x - left;
        b.dx = offset / 50;
        ball.style.transform =
          "rotate(" + (Math.atan2(b.dy, b.dx) * 180) / Math.PI + "deg)";
      } else {
        // si la distance est inférieure au seuil, forcer l'angle de rebond à un certain angle
        b.audiopad.src = "assets/sonball.mp3";
        b.audiopad.play();
        b.dy *= -1;
        b.dx = 0;
        bonus = 0;
      }
    }

    //////////////////////
    //Rebond mur
    //rebond coté
    if (b.x > window.innerWidth - b.w || b.x < 0) {
      b.audiomur.src = "assets/bon.wav";
      b.audiomur.play();
      b.dx *= -1;

      ball.style.transform =
        "rotate(" + (Math.atan2(b.dy, b.dx) * 180) / Math.PI + "deg)";
    }
    //rebond haut bas
    if (b.y < 0) {
      b.audiomur.src = "assets/bon.wav";
      b.audiomur.play();
      b.dy *= -1;
      ball.style.transform =
        "rotate(" + (Math.atan2(b.dy, b.dx) * 180) / Math.PI + "deg)";
    }
    if (b.y > window.innerHeight && ballInGame > 1) {
      ballInGame--;
      b.move = false;
      ball.style.display = "none";
      firstBallInGame = false;
    }
    /////////////////////
    //Ball touche Brique

    const r = b.w / 2;

    for (let i = 0; i < brique.length; i++) {
      if (brique[i].style.visibility !== "hidden" && !isGodBallActive) {
        // Vérifiez si la balle entre en collision avec la brique
        if (
          b.x + r > brique[i].x &&
          b.x - r < brique[i].x + briqueSetting.w &&
          b.y + r > brique[i].offsetTop &&
          b.y - r < brique[i].y + briqueSetting.h
        ) {
          // Vérifiez l'emplacement de la collision
          if (
            b.x + r > brique[i].x &&
            b.x + r < brique[i].x + briqueSetting.w / 2
          ) {
            // Inversez la direction de la balle en x
            b.dx = -b.dx;
          } else if (
            b.x - r < brique[i].x + briqueSetting.w &&
            b.x - r > brique[i].x + briqueSetting.w / 2
          ) {
            // Inversez la direction de la balle en x
            b.dx = -b.dx;
          }
          if (
            b.y + r > brique[i].y &&
            b.y + r < brique[i].y + briqueSetting.h / 2
          ) {
            // Inversez la direction de la balle en y
            b.dy = -b.dy;
          } else if (
            b.y - r < brique[i].y + briqueSetting.h &&
            b.y - r > brique[i].y + briqueSetting.h / 2
          ) {
            // Inversez la direction de la balle en y
            b.dy = 1;
          }
          // Masquez la brique et décrémentez le compteur de briques
          brique[i].style.visibility = "hidden";
          brickCount--;
          sound.sonbrique.src = "assets/sonbrique.wav";
          sound.sonbrique.play();
          points += 100;
          bonus++;
          changeBrickRemain();
          //Bonus
          const spawn = [brique[i].x, brique[i].y];
          if (bonus % 2 === 0 && bonus !== 0) {
            const patern = document.getElementById("patern");
            const boostTexture = new Image();

            function getRandomBoost(array) {
              return array[Math.floor(Math.random() * array.length)];
            }
            const randomBoost = getRandomBoost(boostList);
            boostChoosen = randomBoost;

            boostTexture.src = `assets/${randomBoost}Bonus.png`;
            boostTexture.classList.add("boost", `${boostChoosen}`);
            patern.appendChild(boostTexture);
            let boostId = document.querySelectorAll("img.boost");

            boostId[bonusStreak].style.position = "absolute";
            boostId[bonusStreak].style.left = `${spawn[0]}px`;
            boostId[bonusStreak].style.top = `${spawn[1]}px`;
            boostId[bonusStreak].style.width = `${boost.w}px`;
            boostId[bonusStreak].style.height = `${boost.h}px`;
            if (boostChoosen === "sheild" || boostChoosen === "life") {
              boostId[bonusStreak].style.width = `${sheildSetting.w}px`;
              boostId[bonusStreak].style.height = `${sheildSetting.h}px`;
            }
            bonusStreak++;
            if (!isBonusMove) {
              requestAnimationFrame(bonusMover);
            }
            isBonusMove = true;
          }
        }
      }
    }
    // Points Counter
    if (points - previousPoints === 100) {
    }

    ////////////////////
    //End Game
    //Won
    if (brickCount === 0) {
      b.move = false;
      clearLevel();
      finishMenu("You won");
    }
    //lost and still no life
    if (
      b.y > window.innerHeight &&
      ballInGame === 1 &&
      !isSheildActive &&
      lifes <= 1
    ) {
      clearLevel();
      finishMenu("You lost");
      b.move = false;
      brickCount = 0;
    }
    //Ball Bouncing if sheild active
    if (
      b.y + r * 2 > window.innerHeight - 20 &&
      ballInGame >= 1 &&
      isSheildActive
    ) {
      b.dy *= -b.dy;
      b.audiomur.src = "assets/bon.wav";
      b.audiomur.play();
    }

    /////////////////////
    //Replay because still life

    if (
      b.y > window.innerHeight &&
      ballInGame === 1 &&
      !isSheildActive &&
      lifes > 1
    ) {
      ballInGame--;
      lifes--;
      b.move = false;
      b.follow = true;
      requestAnimationFrame(ballStart);
      requestAnimationFrame(ballFollowPad);
      lifeLostAnimation(lifes);
    }
    ////////////////////////////
    ball.style.left = `${b.x}px`;
    ball.style.top = `${b.y}px`;

    if (b.move) {
      console.log("Duree", window.performance.now() - timetstampAlgoDepart);
      requestAnimationFrame(mover);
    }
  }
  /////////////////////////////////////////////////////
  // bonus mover

  let dx;
  function bonusMover() {
    let getBonus = document.querySelectorAll("img.boost");
    if (getBonus.length === 0) {
      isBonusMove = false;
      bonusStreak = 0;
    }

    for (let i = 0; i < getBonus.length; i++) {
      dx = getBonus[i].offsetTop;
      dx += 2;
      getBonus[i].style.top = `${dx}px`;
      if (getBonus[i].y > window.innerHeight) {
        getBonus[i].remove();
        bonusStreak--;
      }
      if (
        getBonus[i].y + boost.h > window.innerHeight - pad.bottom - pad.h &&
        getBonus[i].y + boost.h < window.innerHeight - pad.bottom &&
        getBonus[i].x + boost.w > left - pad.w / 2 &&
        getBonus[i].x < left + pad.w / 2
      ) {
        getBonus[i].remove();
        bonusStreak--;

        allPower[getBonus[i].classList[1]]();
      }
    }

    if (isBonusMove) {
      requestAnimationFrame(bonusMover);
    }
  }
  //////////////////////////////////
  let balls = [];
  let b2Default = {
    move: false,
    ani: {}
  };

  function createBall(
    abscisse,
    ordonnée,
    deltax,
    deltay,
    size,
    velocity,
    audio
  ) {
    let newBall = new Image();

    newBall.src = "assets/d.png";
    newBall.className = "secondball";
    newBall.style.display = "block";
    newBall.style.position = "absolute";
    newBall.style.left = `${abscisse}px`;
    newBall.style.top = `${ordonnée}px`;
    newBall.style.width = `${size}px`;
    newBall.style.height = `${size}px`;

    document.body.appendChild(newBall);
    balls.push({
      x: abscisse,
      y: ordonnée,
      dx: deltax,
      dy: deltay,
      w: size,
      h: size,
      speed: velocity,
      audiomur: audio,
      audiopad: audio,
      el: newBall
    });
  }

  function mover2() {
    let THRESHOLD = 3;
    for (let i = 0; i < balls.length; i++) {
      let b2 = balls[i];
      // déplacement de la nouvelle balle
      b2.x += b2.dx * b2.speed;
      b2.y += b2.dy * b2.speed;

      // rebond sur la raquette
      if (
        b2.dy > 0 &&
        b2.y + b2.h * 2 > window.innerHeight - pad.bottom - pad.h &&
        b2.y + b2.h < window.innerHeight - pad.bottom &&
        b2.x + b2.w > left - pad.w / 2 &&
        b2.x < left + pad.w / 2
      ) {
        let distance = Math.abs(b2.x - left);
        if (distance > THRESHOLD) {
          b2.dy *= -1;
          b2.audiopad.src = "assets/sonball.mp3";
          b2.audiopad.play();
          let offset = b2.x - left;
          b2.dx = offset / 50;
          bonus = 0;
          b2.el.style.transform =
            "rotate(" + (Math.atan2(b2.dy, b2.dx) * 180) / Math.PI + "deg)";
        } else {
          b2.audiopad.src = "assets/sonball.mp3";
          b2.audiopad.play();
          b2.dy *= -1;
          b2.dx = 0;
          bonus = 0;
          b2.el.style.transform =
            "rotate(" + (Math.atan2(b2.dy, b2.dx) * 180) / Math.PI + "deg)";
        }
      }

      // rebond sur les murs
      //coté
      if (b2.x > window.innerWidth - b2.w || b2.x < 0) {
        b2.audiomur.src = "assets/bon.wav";
        b2.audiomur.play();
        b2.dx *= -1;
        b2.el.style.transform =
          "rotate(" + (Math.atan2(b2.dy, b2.dx) * 180) / Math.PI + "deg)";
      }
      //Haut
      if (b2.y < 0) {
        b2.audiomur.src = "assets/bon.wav";
        b2.audiomur.play();
        b2.dy *= -1;
        b2.el.style.transform =
          "rotate(" + (Math.atan2(b2.dy, b2.dx) * 180) / Math.PI + "deg)";
      }
      //Bas
      if (!isSheildActive) {
        if (b2.y > window.innerHeight && ballInGame > 1) {
          deleteball(i);
        } else if (
          b2.y > window.innerHeight &&
          ballInGame === 1 &&
          firstBallInGame === false &&
          lifes <= 1
        ) {
          deleteball(i);
          clearLevel();
          finishMenu("You lost");
          b2Default.move = false;
        } else if (
          b2.y > window.innerHeight &&
          ballInGame === 1 &&
          !isSheildActive &&
          lifes > 1 &&
          !firstBallInGame
        ) {
          deleteball(i);
          lifes--;
          b2Default.move = false;
          b.follow = true;
          ball.style.display = "block";
          requestAnimationFrame(ballStart);
          requestAnimationFrame(ballFollowPad);
          lifeLostAnimation(lifes);
        }
      } else {
        if (b2.y > window.innerHeight) {
          b2.dy *= b2.dy;
        }
      }

      //collision avec les briques
      const brique = document.querySelectorAll("img.brique");
      const r = b2.w / 2;

      for (let i = 0; i < brique.length; i++ && !isGodBallActive) {
        if (
          brique[i].style.visibility !== "hidden" &&
          isGodBallActive === false
        ) {
          // Vérifiez si la balle entre en collision avec la brique
          if (
            b2.x + r > brique[i].x &&
            b2.x - r < brique[i].x + briqueSetting.w &&
            b2.y + r > brique[i].y &&
            b2.y - r < brique[i].y + briqueSetting.h
          ) {
            // Vérifiez l'emplacement de la collision
            if (
              b2.x + r > brique[i].x &&
              b2.x + r < brique[i].x + briqueSetting.w / 2
            ) {
              // Inversez la direction de la balle en x
              b2.dx = -1;
            } else if (
              b2.x - r < brique[i].x + briqueSetting.w &&
              b2.x - r > brique[i].x + briqueSetting.w / 2
            ) {
              // Inversez la direction de la balle en x
              b2.dx = -1;
            }
            if (
              b2.y + r > brique[i].y &&
              b2.y + r < brique[i].y + briqueSetting.h / 2
            ) {
              // Inversez la direction de la balle en y
              b2.dy = -1;
            } else if (
              b2.y - r < brique[i].y + briqueSetting.h &&
              b2.y - r > brique[i].y + briqueSetting.h / 2
            ) {
              // Inversez la direction de la balle en y
              b2.dy = 1;
            }
            // Masquez la brique et décrémentez le compteur de briques
            brique[i].style.visibility = "hidden";
            brickCount--;
            sound.sonbrique.src = "assets/sonbrique.wav";
            sound.sonbrique.play();
            points += 100;
            bonus++;
            changeBrickRemain();
            //Bonus
            const spawn = [brique[i].x, brique[i].y];
            if (bonus % 2 === 0 && bonus !== 0) {
              const patern = document.getElementById("patern");
              const boostTexture = new Image();

              function getRandomBoost(array) {
                return array[Math.floor(Math.random() * array.length)];
              }
              const randomBoost = getRandomBoost(boostList);
              boostChoosen = randomBoost;

              boostTexture.src = `assets/${boostChoosen}Bonus.png`;
              boostTexture.classList.add("boost", `${boostChoosen}`);
              patern.appendChild(boostTexture);
              let boostId = document.querySelectorAll("img.boost");

              boostId[bonusStreak].style.position = "absolute";
              boostId[bonusStreak].style.left = `${spawn[0]}px`;
              boostId[bonusStreak].style.top = `${spawn[1]}px`;
              boostId[bonusStreak].style.width = `${boost.w}px`;
              boostId[bonusStreak].style.height = `${boost.h}px`;
              if (boostChoosen === "sheild" || boostChoosen === "life") {
                boostId[bonusStreak].style.width = `${sheildSetting.w}px`;
                boostId[bonusStreak].style.height = `${sheildSetting.h}px`;
              }
              bonusStreak++;
              if (!isBonusMove) {
                requestAnimationFrame(bonusMover);
              }
              isBonusMove = true;
            }
          }
        }
      }
      b2.el.style.left = `${b2.x}px`;
      b2.el.style.top = `${b2.y}px`;
    }
    function deleteball(nb) {
      ballInGame--;
      balls.splice(nb, 1);
    }

    if (b2Default.move) {
      requestAnimationFrame(mover2);
    }
    if (brickCount === 0 && ballInGame > 0) {
      b2Default.move = false;
      clearLevel();
      finishMenu("You won");
    }
  }

  let isLongerpadActive = false;
  let isReducepadActive = false;
  let padaudio = new Audio("assets/risingSound.mp3");
  let lasersound = new Audio("assets/laserSound.wav");
  let isLaserActive = false;
  const allPower = {
    sheild: function () {
      isSheildActive = true;
      const sheild = document.getElementById("getSheild");

      sheild.style.transform = "translateY(0px)";

      setTimeout(function () {
        isSheildActive = false;
        sheild.style.transform = "translateY(100%)";
      }, 10000);
    },
    fasterball: function () {
      if (b.speed < 11) {
        b.speed += 2;
        for (i = 0; i < balls.length; i++) {
          balls[i].speed += 2;
        }
      }
      console.log(b.speed);
    },
    slowerball: function () {
      if (b.speed > 3) {
        b.speed -= 2;
        for (i = 0; i < balls.length; i++) {
          balls[i].speed -= 2;
        }
      }
    },
    godball: function () {
      const brique = document.querySelectorAll("img.brique");
      const r = b.w / 2;
      const fireball = document.getElementById("ball");

      b.w = 70;
      b.h = 40;
      fireball.style.width = `${b.w}px`;
      fireball.style.height = `${b.h}px`;
      fireball.src = "assets/fireball.gif";

      const secFireball = document.querySelectorAll(".secondball");
      for (let i = 0; i < secFireball.length; i++) {
        secFireball[i].style.width = `${b.w}px`;
        secFireball[i].style.height = `${b.h}px`;
        secFireball[i].src = "assets/fireball.gif";
      }
      let timer = setInterval(function () {
        isGodBallActive = true;
        //First ball
        for (let i = 0; i < brique.length; i++) {
          if (brique[i].style.visibility !== "hidden" && isGodBallActive) {
            // Vérifiez si la balle entre en collision avec la brique
            if (
              b.x + r > brique[i].x &&
              b.x - r < brique[i].x + briqueSetting.w &&
              b.y + r > brique[i].y &&
              b.y - r < brique[i].y + briqueSetting.h
            ) {
              brique[i].style.visibility = "hidden";
              brickCount--;
              sound.sonbrique.src = "assets/sonbrique.wav";
              sound.sonbrique.play();
              changeBrickRemain();
            }
          }
        }
        // Second Ball
        for (let i = 0; i < balls.length; i++) {
          let b2 = balls[i];
          for (let i = 0; i < brique.length; i++) {
            if (brique[i].style.visibility !== "hidden") {
              // Vérifiez si la balle entre en collision avec la brique
              if (
                b2.x + r > brique[i].x &&
                b2.x - r < brique[i].x + briqueSetting.w &&
                b2.y + r > brique[i].y &&
                b2.y - r < brique[i].y + briqueSetting.h
              ) {
                brique[i].style.visibility = "hidden";
                brickCount--;
                sound.sonbrique.src = "assets/sonbrique.wav";
                sound.sonbrique.play();
                changeBrickRemain();
              }
            }
          }
        }
      }, 1);

      setTimeout(function () {
        clearInterval(timer);
        fireball.src = "assets/ballskin.png";
        b.w = 25;
        b.h = 25;
        fireball.style.width = `${b.w}px`;
        fireball.style.height = `${b.h}px`;
        const secFireball = document.querySelectorAll(".secondball");
        for (let i = 0; i < secFireball.length; i++) {
          secFireball[i].style.width = `${b.w}px`;
          secFireball[i].style.height = `${b.h}px`;
          secFireball[i].src = "assets/ballskin.png";
        }
        isGodBallActive = false;
      }, 10000);
    },

    longerpad: function () {
      if (!isLongerpadActive) {
        isLongerpadActive = true;
        isReducepadActive = false;

        padaudio.play();
        bar.style.transition = "width 1s ease-in-out";
        pad.w = 250;
        bar.style.width = `${pad.w}px`;
        if (!isLaserActive) {
          bar.src = "assets/longerpaditem.png";
        }
      }
      setTimeout(() => {
        if (isLongerpadActive) {
          isLongerpadActive = false;
          pad.w = 160;
          bar.style.width = `${pad.w}px`;
          bar.src = "assets/barskin.png";
          padaudio.play();
        }
      }, 20000);
    },
    reducepad: function () {
      if (!isReducepadActive) {
        isReducepadActive = true;
        isLongerpadActive = false;

        padaudio.play();
        bar.style.transition = "width 1s ease-in-out";
        pad.w = 100;
        bar.style.width = `${pad.w}px`;
        if (!isLaserActive) {
          bar.src = "assets/reducepaditem.png";
        }
      }
      setTimeout(() => {
        if (isReducepadActive) {
          isReducepadActive = false;
          pad.w = 160;
          bar.style.width = `${pad.w}px`;
          bar.src = "assets/barskin.png";
          padaudio.play();
        }
      }, 20000);
    },
    life: function () {
      if (lifes < 4) {
        for (let i = lifes - 1; i < lifes; i++) {
          let img = new Image();
          img.src = "assets/life.png";
          document.body.appendChild(img);
          img.classList.add("life-" + lifes, "lifes");

          document.body.appendChild(img);
        }
        lifes++;
      }
    },
    multiplier: function () {
      let dx = 1;
      let dy = -1;
      for (let i = 0; i < 2; i++) {
        ballInGame = ballInGame + 1;
        if (i === 1) {
          dx = -b.dx;
        }

        createBall(b.x, b.y, dx, dy, 25, 5, new Audio());
      }
      if (!b2Default.move) {
        b2Default.move = true;
        requestAnimationFrame(mover2);
      }
      // setTimeout(() => {}, 10000);
    },
    laserpad: function () {
      let laserPas = 6;
      if (!isLaserActive) {
        isLaserActive = true;
        const brique = document.querySelectorAll("img.brique");
        bar.src = "assets/laserpaditem.png";

        //Laser Sound effect
        let sound = setInterval(() => {
          lasersound.play();
          if (isClearLevelCalled) {
            clearInterval(sound);
            bar.src = "assets/barskin.png";
          }
        }, 50);

        //Right Laser
        let launchRight = setInterval(function () {
          let laser = new Image();
          laser.src = "assets/laseritem.png";
          laser.classList.add("laserRight", "laser");
          laser.style.position = "absolute";
          laser.style.width = "10px";
          laser.style.height = "30px";
          laser.style.top = `${window.innerHeight - pad.bottom - pad.h - 15}px`;
          laser.style.left = `${left + pad.w / 2 - 10}px`;
          document.body.appendChild(laser);
          if (isClearLevelCalled) {
            clearInterval(launchRight);
          }
        }, 500);

        requestAnimationFrame(lasermoveRight);

        function lasermoveRight() {
          let getAllLaser = document.querySelectorAll(".laserRight");
          for (let i = 0; i < getAllLaser.length; i++) {
            getAllLaser[i].style.top = `${
              getAllLaser[i].offsetTop - laserPas
            }px`;

            for (let a = 0; a < brique.length; a++) {
              if (
                getAllLaser[i].offsetTop < brique[a].y + briqueSetting.h &&
                getAllLaser[i].offsetTop > brique[a].y &&
                getAllLaser[i].offsetLeft > brique[a].x &&
                getAllLaser[i].offsetLeft < brique[a].x + briqueSetting.w &&
                brique[a].style.visibility !== "hidden"
              ) {
                brique[a].style.visibility = "hidden";
                brickCount--;
                getAllLaser[i].remove();
              }
            }
            if (getAllLaser[i].offsetTop < 0) {
              getAllLaser[i].remove();
            }
          }
          if (getAllLaser.length > 0 || isLaserActive) {
            requestAnimationFrame(lasermoveRight);
          }
        }
        //Left Laser

        let launchLeft = setInterval(function () {
          let laser = new Image();
          laser.src = "assets/laseritem.png";
          laser.classList.add("laserLeft", "laser");
          laser.style.position = "absolute";
          laser.style.width = "10px";
          laser.style.height = "30px";
          laser.style.top = `${window.innerHeight - pad.bottom - pad.h - 15}px`;
          laser.style.left = `${left - pad.w / 2}px`;
          document.body.appendChild(laser);
          if (isClearLevelCalled) {
            clearInterval(launchLeft);
          }
          console.log(ballInGame);
        }, 500);

        requestAnimationFrame(lasermoveLeft);

        function lasermoveLeft() {
          let getAllLaser = document.querySelectorAll(".laserLeft");
          for (let i = 0; i < getAllLaser.length; i++) {
            getAllLaser[i].style.top = `${
              getAllLaser[i].offsetTop - laserPas
            }px`;

            for (let a = 0; a < brique.length; a++) {
              if (
                getAllLaser[i].offsetTop < brique[a].y + briqueSetting.h &&
                getAllLaser[i].offsetTop > brique[a].y &&
                getAllLaser[i].offsetLeft > brique[a].x &&
                getAllLaser[i].offsetLeft < brique[a].x + briqueSetting.w &&
                brique[a].style.visibility !== "hidden"
              ) {
                brique[a].style.visibility = "hidden";
                brickCount--;
                getAllLaser[i].remove();
              }
            }
            if (getAllLaser[i].offsetTop < 0) {
              getAllLaser[i].remove();
            }
          }
          if (getAllLaser.length > 0 || isLaserActive) {
            requestAnimationFrame(lasermoveLeft);
          }
        }

        setTimeout(() => {
          isLaserActive = false;
          clearInterval(sound);
          clearInterval(launchRight);
          clearInterval(launchLeft);
          bar.src = "assets/barskin.png";
        }, 10000);
      }
    }
  };
  ////////////
  // function consoleLog() {
  //   console.log(ballInGame);

  //   requestAnimationFrame(consoleLog);
  // }
  // requestAnimationFrame(consoleLog);
  // Admin
  if (isCorrect) {
    const button = document.getElementById("play-button");
    const speedPlus = document.getElementById("speedPlus");
    const speedLess = document.getElementById("speedLess");

    button.style.display = "block";
    speedPlus.style.display = "block";
    speedLess.style.display = "block";

    button.addEventListener("click", () => {
      if (!b.move) {
        b.ani = requestAnimationFrame(mover);
        b.move = true;
        b2Default.ani = requestAnimationFrame(mover2);
        b2Default.move = true;
        requestAnimationFrame(bonusMover);
      } else {
        cancelAnimationFrame(b.ani);

        b.move = false;
        cancelAnimationFrame(b2Default.ani);
        b2Default.move = false;
      }
    });

    speedPlus.addEventListener("click", () => {
      b.speed++;
    });

    speedLess.addEventListener("click", () => {
      b.speed--;
    });
  }
  /////////////////////
  //ball suit raquette et part quand space est cliqué
  function ballFollowPad() {
    if (b.follow) {
      b.x = left - b.w / 2;
      ball.style.left = `${b.x}px`;
      b.y = window.innerHeight - pad.bottom - pad.h - b.h - 20;
      ball.style.top = `${b.y}px`;
    }
    if (b.move) {
      b.follow = false;
    }
    if (!keyPressed.space) {
      requestAnimationFrame(ballFollowPad);
    }
  }
  requestAnimationFrame(ballFollowPad);

  function ballStart() {
    if (keyPressed.space) {
      if (!b.move) {
        b.follow = false;
        b.ani = requestAnimationFrame(mover);
        b.move = true;
        ballInGame++;
      }
    } else {
      requestAnimationFrame(ballStart);
    }
  }

  requestAnimationFrame(ballStart);
  //pause button
  const pausePage = document.getElementById("pausePage");
  const getPause = document.getElementById("pause");
  const bri = document.querySelectorAll(".brique", "lifes");
  const playPause = document.getElementById("playPause");
  const backMenu = document.getElementById("backMenu");
  const replay = document.getElementById("replay");
  const textPourcent = document.getElementById("pourcent");
  const soundRange = document.getElementById("volume");
  const musicPause = document.getElementById("music");
  const soundPause = document.getElementById("sound");
  let isPausePageOpen = false;
  let isBonusSettingChanged = false;
  //Open pause page
  getPause.addEventListener("click", () => {
    if (!isPausePageOpen) {
      click.play();
      getPause.style.display = "none";

      isPausePageOpen = true;
      b.speed = 0;
      b.speed = 0;
      for (let i = 0; i < balls.length; i++) {
        balls[i].speed = 0;
      }
      pausePage.style.display = "block";

      bri.forEach(function (brique) {
        brique.style.filter = "blur(6px)";
      });
      if (isBonusMove) {
        isBonusMove = false;
        isBonusSettingChanged = true;
      }
      isBarmove = false;
    }
  });
  //Close Pause page
  playPause.addEventListener("click", () => {
    if (isPausePageOpen) {
      click.play();
      getPause.style.display = "block";
      isPausePageOpen = false;
      b.speed = 5;
      b.speed = 5;
      for (let i = 0; i < balls.length; i++) {
        balls[i].speed = 5;
      }
      pausePage.style.display = "none";

      bri.forEach(function (brique) {
        brique.style.filter = "none";
      });
      if (isBonusSettingChanged) {
        isBonusMove = true;
        requestAnimationFrame(bonusMover);
        isBonusSettingChanged = false;
      }
      isBarmove = true;
      requestAnimationFrame(barmove);
    }
  });

  //Back to Menu
  backMenu.addEventListener("click", () => {
    if (isPausePageOpen) {
      click.play();
      location.reload();
    }
  });
  //Reload leve
  replay.addEventListener("click", () => {
    if (isPausePageOpen) {
      click.play();
      const actionsToExecute = {
        getVidBgDisplay: "none",
        pauseDisplay: "block",
        bodyBackgroundImage: "url('assets/spacebg.jpg')",
        titleDisplay: "none",
        playDisplay: "none",
        formDisplay: "none",
        levelOneDisplay1: "block",
        levelOneDisplay2: "block",
        isClearLevelCalled: false
      };

      localStorage.setItem(
        "actionsToExecute",
        JSON.stringify(actionsToExecute)
      );
      location.reload();
    }
  });

  //Volume bar progresion

  function manageVolume() {
    levelMusic.volume = soundRange.value / 100;
    textPourcent.textContent = soundRange.value + "%";
    soundRange.style.background = `linear-gradient(to right, #127b18 ${soundRange.value}%, #127b18 ${soundRange.value}%, transparent ${soundRange.value}%, transparent 100%)`;
  }

  soundRange.addEventListener("input", manageVolume);

  //Music pause
  musicPause.addEventListener("click", () => {
    if (!levelMusic.paused) {
      click.play();
      levelMusic.pause();
      musicPause.src = "assets/musicLocked.png";
    } else {
      click.play();
      levelMusic.play();
      musicPause.src = "assets/music.png";
    }
  });

  //Sound Pause
  soundPause.addEventListener("click", () => {
    if (b.audiomur.volume > 0) {
      click.play();
      b.audiomur.volume = 0;
      b.audiopad.volume = 0;
      sound.sonbrique.volume = 0;
      soundPause.src = "assets/soundLocked.png";
    } else {
      click.play();
      b.audiomur.volume = 1;
      b.audiopad.volume = 1;
      sound.sonbrique.volume = 1;
      soundPause.src = "assets/sound.png";
    }
  });
}

if (localStorage.getItem("actionsToExecute")) {
  const actionsToExecute = JSON.parse(localStorage.getItem("actionsToExecute"));

  const getVidBg = document.querySelector(".bloc");
  const pause = document.getElementById("pause");
  const body = document.querySelector("body");
  const title = document.getElementById("title");
  const play = document.getElementById("play");
  const form = document.querySelector("form");
  const musicPause = document.getElementById("music");

  getVidBg.style.display = actionsToExecute.getVidBgDisplay;
  pause.style.display = actionsToExecute.pauseDisplay;
  body.style.backgroundImage = actionsToExecute.bodyBackgroundImage;
  title.style.display = actionsToExecute.titleDisplay;
  play.style.display = actionsToExecute.playDisplay;
  form.style.display = actionsToExecute.formDisplay;
  musicPause.src = "assets/musicLocked.png";
  levelOne(
    actionsToExecute.levelOneDisplay1,
    actionsToExecute.levelOneDisplay2
  );
  isClearLevelCalled = actionsToExecute.isClearLevelCalled;

  localStorage.removeItem("actionsToExecute");

  //Set volume
}

function clearLevel() {
  //
  brickCount = 0;
  //function was called
  isClearLevelCalled = true;
  //Clear all bricks
  let brique = document.querySelectorAll("img.brique");
  for (let i = 0; i < brique.length; i++) {
    brique[i].remove();
  }
  //Clear all balls
  ball.style.display = "none";

  const allballs = document.querySelectorAll(".secondball");
  for (let i = 0; i < allballs.length; i++) {
    allballs[i].remove();
  }

  //Clear all paterns brick
  let allPatern = document.querySelectorAll("div.patern");
  for (let i = 0; i < allPatern.length; i++) {
    allPatern[i].style.display = "none";
  }

  const allPaternC = document.querySelectorAll(".paternC");
  for (let i = 0; i < allPaternC.length; i++) {
    allPaternC[i].style.display = "none";
  }

  //Clear all boost still in game
  const getAllBoost = document.querySelectorAll(".boost");
  for (let i = 0; i < getAllBoost.length; i++) {
    getAllBoost[i].remove();
  }

  //Clear pad
  bar.style.display = "none";

  left = window.innerWidth / 2;

  //Clear all laser if laser bonus is actived
  const getAllLaser = document.querySelectorAll(".laser");
  for (let i = 0; i < getAllLaser.length; i++) {
    getAllLaser[i].remove();
  }

  //Clear Sheild if is actived
  const sheild = document.getElementById("getSheild");
  sheild.style.transform = "translateY(100%)";
  //Clear lifes icon
  const getAllLifes = document.querySelectorAll(".lifes");
  getAllLifes.forEach(function (life) {
    life.remove();
  });
  //Clear Brick Remain
  const getBrickRemain = document.querySelector(".brickRemain-style");
  getBrickRemain.remove();
  //Clear pause button
  const getPausebtn = document.getElementById("pause");
  getPausebtn.style.display = "none";
}

function finishMenu(a) {
  const backToMenu = document.getElementById("backToMenu");
  const finishMenu = document.getElementById("finishMenu");

  finishMenu.style.display = "block";
  finishMenu.innerHTML = `${a}`;
  backToMenu.style.display = "block";

  backToMenu.addEventListener("click", () => {
    levelMusic.pause();
    musicMenu.play();
    finishMenu.style.display = "none";
    backToMenu.style.display = "none";
    menu("block", "block");
  });
}
