import { Point, pi } from "./Point.js";

const c = document.getElementById("esfera3d");
const ctx = c.getContext("2d");
const w = (c.width = 480);
const h = (c.height = 480);
document.body.appendChild(c);

class Sphere {
    constructor(radius = 20, vertexQuantity = 20) {
        this.point = [];
        this.color = `rgb(255,255,255)`;
        this.radius = radius;
        this.numVertexes = 0;
        this.vertexQuantity = vertexQuantity;
        this.rotation = 0;
        this.distance = 0;
        this.init();
    }

    init() {
        let increment = pi / this.vertexQuantity;
        for (let alpha = increment; alpha <= 2 * pi; alpha += increment) {
            for (let beta = increment; beta <= pi; beta += increment) {
                let p = (this.point[this.numVertexes] = new Point());
                p.x = Math.cos(alpha) * Math.sin(beta) * this.radius;
                p.y = Math.sin(alpha) * this.radius;
                p.z = Math.cos(alpha) * Math.cos(beta) * this.radius;
                this.numVertexes++;
            }
        }
    }

    draw() {
        let x, y;
        let p = new Point(0, 0, 0, ctx);
        for (let i = 0; i < this.numVertexes; i++) {
            p.x = this.point[i].x;
            p.y = this.point[i].y;
            p.z = this.point[i].z;
            p.rotateY(this.rotation);
            x = p.getProjection(this.distance, p.x, w / 2.0, 100.0);
            y = p.getProjection(this.distance, p.y, h / 2.0, 100.0);
            p.draw(x, y, this.color);
        }
    }

    update() {
        this.rotation += pi / 360.0;
        this.distance = 900;
    }
}

const esfera = new Sphere();
let animationRunning = false;

const draw = () => {
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    esfera.draw();
    ctx.restore();
    esfera.update();

    animationRunning ? requestAnimationFrame(draw) : 0;
};

const startAnimation = () => {
    animationRunning = true;
    draw();
};

const stopCleanCanvas = () => {
    animationRunning = false;
    ctx.clearRect(0, 0, w, h);
};

document.getElementById("play").addEventListener("click", startAnimation);
document
    .getElementById("stop_clean")
    .addEventListener("click", stopCleanCanvas);
