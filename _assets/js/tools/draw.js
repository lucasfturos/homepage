function getBgColor() {
    return document.body.classList.contains("light-mode") ? 255 : 30;
}

let bgColor = getBgColor();

let paths = [];
let currentPath = [];
let erasing = false;

const paintCursor = document.getElementById("paint-cursor");
const eraserCursor = document.getElementById("eraser-cursor");
const weightInput = document.getElementById("weight-draw");
const colorInput = document.getElementById("color-draw");
const clearBtn = document.getElementById("clear-draw");

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("display", "block");
    background(bgColor);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(bgColor);
}

function draw() {
    noFill();
    if (mouseIsPressed) {
        const point = {
            x: mouseX,
            y: mouseY,
            color: erasing
                ? bgColor
                : document.getElementById("color-draw").value,
            weight: document.getElementById("weight-draw").value,
        };
        currentPath.push(point);
    }

    paths.forEach((path) => {
        beginShape();
        path.forEach((point) => {
            stroke(point.color);
            strokeWeight(point.weight);
            vertex(point.x, point.y);
        });
        endShape();
    });
}

function mousePressed() {
    currentPath = [];
    paths.push(currentPath);
}

document.addEventListener("mousemove", (e) => {
    const size = parseInt(weightInput.value, 10);

    paintCursor.style.left = e.clientX + "px";
    paintCursor.style.top = e.clientY + "px";
    paintCursor.style.width = size + "px";
    paintCursor.style.height = size + "px";
    paintCursor.style.backgroundColor = colorInput.value;

    eraserCursor.style.left = e.clientX + "px";
    eraserCursor.style.top = e.clientY + "px";
    eraserCursor.style.width = size + "px";
    eraserCursor.style.height = size + "px";
});

clearBtn.addEventListener("click", () => {
    erasing = !erasing;
    clearBtn.classList.toggle("active", erasing);
    paintCursor.style.display = erasing ? "none" : "block";
    eraserCursor.style.display = erasing ? "block" : "none";
});

paintCursor.style.display = "block";

document.getElementById("themeToggle").addEventListener("change", () => {
    bgColor = getBgColor();
    background(bgColor);
});
