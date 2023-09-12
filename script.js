const gridContainer = document.querySelector(".grid-container");

let mouseDown = false;

document.addEventListener("mousedown", () => (mouseDown = true));
document.addEventListener("mouseup", () => (mouseDown = false));

let selectedColor = document
  .querySelector(".selected-color")
  .style.getPropertyValue("background-color");

function createGrid(size) {
  let padding = gridContainer.offsetWidth / (2 * size);

  let gridRow = document.createElement("div");
  gridRow.classList.add("grid-row");
  for (let i = 1; i <= size * size; i++) {
    let gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    gridCell.style.setProperty("padding", padding + "px");
    gridCell.addEventListener("mouseenter", (e) => {
      if (mouseDown) {
        e.target.style.backgroundColor = selectedColor;
      }
    });

    gridRow.appendChild(gridCell);

    if (i % size === 0) {
      gridContainer.appendChild(gridRow);
      gridRow = document.createElement("div");
      gridRow.classList.add("grid-row");
    }
  }

  document.querySelector(".size-number").textContent = `${size} x ${size}`;
}

createGrid(16);

let size = 16;
function changeSize(e) {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
  size = e.target.value;
  createGrid(size);
}

const colorContainer = document.querySelector(".color-container");
function changeColor(e) {
  selectedColor = e.target.style.getPropertyValue("background-color");

  let buttons = colorContainer.children;
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    if (button.classList.contains("selected-color") || button === e.target) {
      button.classList.toggle("selected-color");
    }
  }
}

function addColor() {
  let color = prompt("Color?").toLowerCase();
  let newColor = document.createElement("button");
  newColor.style.setProperty("background-color", color);
  newColor.addEventListener("click", (e) => changeColor(e));

  colorContainer.appendChild(newColor);
}

function clearAll() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
  createGrid(size);
}
