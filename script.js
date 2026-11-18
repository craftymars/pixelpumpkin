
const plant = document.getElementById("plant");
const growthPercent = document.getElementById("growth-percent");
const progressFill = document.getElementById("progress-fill");
const gardenMessage = document.getElementById("garden-message");

const waterBtn = document.getElementById("water-btn");
const sunBtn = document.getElementById("sun-btn");
const growBtn = document.getElementById("grow-btn");

let growth = 0;
let hasWater = false;
let hasSunlight = false;

function updateGarden(animate = false) {
  growthPercent.textContent = `${growth}%`;
  progressFill.style.width = `${growth}%`;

  growBtn.textContent =
    growth === 100 ? "RESTART" : "GROWTH";

  let image;
  let alt;
  let stage;

  if (growth === 0) {
    image = "assets/Seed.webp";
    alt = "Pumpkin seed";
    stage = "stage-seed";
  } else if (growth === 50) {
    image = "assets/sprout.webp";
    alt = "Pumpkin sprout";
    stage = "stage-sprout";
  } else {
    image = "assets/Pumpkin.webp";
    alt = "Fully grown pumpkin";
    stage = "stage-pumpkin";
  }

  function showPlant() {
    plant.src = image;
    plant.alt = alt;

    plant.classList.remove(
      "stage-seed",
      "stage-sprout",
      "stage-pumpkin",
      "plant-growing",
      "plant-exiting"
    );

    plant.classList.add(stage);

const soil = document.querySelector(".garden-scene .soil");

soil.classList.toggle(
  "soil-expanded",
  growth === 100
);

    if (animate) {
      void plant.offsetWidth;
      plant.classList.add("plant-growing");
    }
  }

  if (animate) {
    plant.classList.add("plant-exiting");

    setTimeout(showPlant, 250);
  } else {
    showPlant();
  }
}


function animateWater() {
  const scene = document.querySelector(".garden-scene");

  for (let i = 0; i < 6; i++) {
    const drop = document.createElement("span");

    drop.classList.add("water-drop");
    drop.style.left = `${25 + i * 10}%`;
    drop.style.animationDelay = `${i * 0.1}s`;

    scene.appendChild(drop);

    drop.addEventListener("animationend", () => {
      drop.remove();
    }, { once: true });
  }
}

// Water the seed
waterBtn.addEventListener("click", () => {
    animateWater();
  if (growth === 100) {
    gardenMessage.textContent =
      "Your pumpkin is already fully grown! 🎃";
    return;
  }

  hasWater = true;

  if (growth === 0) {
    growth = 50;
    gardenMessage.textContent =
      "Your little seed has sprouted! 🌱";
  } else {
    gardenMessage.textContent =
      "Your sprout is watered! 💧";
  }

  updateGarden();
});

function animateSunlight() {
  const scene = document.querySelector(".garden-scene");

  // Remove any previous sunlight animation
  scene.querySelector(".sunlight-effect")?.remove();

  const effect = document.createElement("div");
  effect.className = "sunlight-effect";

  // Create 8 glowing sun rays
  for (let i = 0; i < 8; i++) {
    const ray = document.createElement("span");
    ray.className = "sun-ray";

    ray.style.setProperty(
      "--angle",
      `${i * 45}deg`
    );

    effect.appendChild(ray);
  }

  scene.appendChild(effect);

  // Clean up after animation
  setTimeout(() => {
    effect.remove();
  }, 1500);
}

// Give the plant sunlight
sunBtn.addEventListener("click", () => {
  if (growth === 100) {
    gardenMessage.textContent =
      "Your pumpkin loves the sunshine! ☀️";
    return;
  }

  if (!hasWater) {
    gardenMessage.textContent =
      "Your seed needs water first! 💧";
    return;
  }

animateSunlight(true);

hasSunlight = true;
growth = 100;

  hasSunlight = true;
  growth = 100;

  gardenMessage.textContent =
    "Your pumpkin has fully grown! 🎃";

  updateGarden(true);
});

growBtn.addEventListener("click", () => {
  if (growth === 100) {
    // Reset everything for a new pumpkin
    growth = 0;
    hasWater = false;
    hasSunlight = false;

    gardenMessage.textContent =
      "A new little pumpkin is waiting to grow! 🌱";

    updateGarden(true);
    return;
  }

  if (growth === 0) {
    gardenMessage.textContent =
      "Your seed is waiting for water!";
  } else if (growth === 50) {
    gardenMessage.textContent =
      "Your sprout needs some sunlight!";
  }
});


// Initialize the garden
updateGarden();

function createAmbientParticles() {
  const game = document.querySelector(".game");

  const colors = ["purple", "green", "gold"];

  // Particles beside the garden and near the buttons
  const positions = [
    [5, 30],
    [90, 34],
    [8, 44],
    [94, 51],
    [12, 61],
    [87, 65],
    [15, 77],
    [83, 81],
    [48, 88]
  ];

  positions.forEach(([x, y], index) => {
    const particle = document.createElement("span");

    particle.className =
      `pixel-particle ${colors[index % colors.length]}`;

    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;

    particle.style.setProperty(
      "--duration",
      `${4 + (index % 4)}s`
    );

    particle.style.setProperty(
      "--delay",
      `${-index * 0.7}s`
    );

    game.appendChild(particle);
  });
}

createAmbientParticles();

function createGardenMagic() {
  const scene = document.querySelector(".garden-scene");

  // Prevent duplicate particle layers
  if (scene.querySelector(".garden-magic")) return;

  const magicLayer = document.createElement("div");
  magicLayer.className = "garden-magic";

  const colors = ["green", "purple", "gold"];

  // Keep particles around the edges of the plant
  const positions = [
    [12, 20],
    [82, 18],
    [22, 42],
    [88, 48],
    [10, 70],
    [78, 75],
    [35, 12],
    [65, 30],
    [18, 85],
    [92, 65]
  ];

  positions.forEach(([x, y], index) => {
    const particle = document.createElement("span");

    particle.className =
      `magic-particle ${colors[index % colors.length]}`;

    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;

    particle.style.setProperty(
      "--speed",
      `${4 + (index % 4)}s`
    );

    particle.style.setProperty(
      "--delay",
      `${-index * 0.6}s`
    );

    magicLayer.appendChild(particle);
  });

  scene.appendChild(magicLayer);
}

createGardenMagic();
