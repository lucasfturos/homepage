const colorInput = document.getElementById('color-draw')
const weight = document.getElementById('weight-draw')
const clear = document.getElementById('clear-draw')
const paths = []
let currentPath = []

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(30)
}

function draw() {
    noFill()

    if (mouseIsPressed) {
        const point = {
            x: mouseX,
            y: mouseY,
            color: colorInput.value,
            weight: weight.value
        }
        currentPath.push(point)
    }

    paths.forEach(path => {
        beginShape()
        path.forEach(point => {
            stroke(point.color)
            strokeWeight(point.weight)
            vertex(point.x,point.y)
        })
        endShape()
    })
}

function mousePressed() {
    currentPath = []
    paths.push(currentPath)
}

clear.addEventListener('click', () => {
    paths.splice(0)
    background(30)
})