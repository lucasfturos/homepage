import { Point, pi } from "./Point.js";

const c = document.getElementById("torus");
const ctx = c.getContext("2d");
const w = (c.width = 480);
const h = (c.height = 480);
document.body.appendChild(c);

class Torus {
    constructor(innerRadius = 5, outterRadius = 10, vertexQuantity = 20) {
        this.point = [];
        this.color = `rgb(255,255,255)`;
        this.innerRadius = innerRadius;
        this.outterRadius = outterRadius;
        this.numVertexes = 0;
        this.vertexQuantity = vertexQuantity;
        this.rotation = 0;
        this.distance = 0;
        this.init();
    }
    init() {
        let increment = pi / this.vertexQuantity;
        for (let alpha = increment; alpha <= 2 * pi; alpha += increment) {
            for (let beta = increment; beta <= 2 * pi; beta += increment) {
                let p = (this.point[this.numVertexes] = new Point());
                p.x =
                    (this.outterRadius + this.innerRadius * Math.cos(beta)) *
                    Math.cos(alpha);
                p.y =
                    (this.outterRadius + this.innerRadius * Math.cos(beta)) *
                    Math.sin(alpha);
                p.z = this.innerRadius * Math.sin(beta);
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
            p.rotateX(this.rotation);
            p.rotateY(this.rotation);
            p.rotateZ(this.rotation);
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
const toroide = new Torus();
let animationRunning = false;

const draw = () => {
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    toroide.draw();
    ctx.restore();
    toroide.update();

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
