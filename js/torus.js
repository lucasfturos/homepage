const c = document.getElementById("torus");
const $ = c.getContext("2d");
const w = (c.width = 480);
const h = (c.height = 480);
const pi = 3.1415926535897932384626433832795028841971;
document.body.appendChild(c);

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    rotateX(amount) {
        let y = this.y;
        this.y = (y * Math.cos(amount)) + (this.z * Math.sin(amount) * -1.0);
        this.z = (y * Math.sin(amount)) + (this.z * Math.cos(amount));
    }
    rotateY(amount) {
        let x = this.x;
        this.x = x * Math.cos(amount) + this.z * Math.sin(amount) * -1.0;
        this.z = x * Math.sin(amount) + this.z * Math.cos(amount);
    }
    rotateZ(amount) {
        let x = this.x;
        this.x = (x * Math.cos(amount)) + (this.y * Math.sin(amount) * -1.0);
        this.y = (x * Math.sin(amount)) + (this.y * Math.cos(amount));
    }
    getProjection(distance, xy, offSet, offSetZ) {
        return (distance * xy) / (this.z - offSetZ) + offSet;
    }
    draw(x, y, size, color) {
        $.save();
        $.beginPath();
        $.fillStyle = "rgb(255,255,255)";
        $.arc(x, y, 1.5, 0, 2 * pi, true);
        $.fill();
        $.restore();
    }
}

class Torus {
    constructor(innerRadius = 5, outterRadius = 10, vertexQuantity = 20) {
        this.point = [];
        this.color = "rgb(255,255,255)";
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
                p.x = (this.outterRadius + this.innerRadius * Math.cos(beta)) * Math.cos(alpha);
                p.y = (this.outterRadius + this.innerRadius * Math.cos(beta)) * Math.sin(alpha);
                p.z = this.innerRadius * Math.sin(beta);
                this.numVertexes++;
            }
        }
    }
    draw() {
        let x, y;
        let p = new Point();
        for (let i = 0; i < this.numVertexes; i++) {
            p.x = this.point[i].x;
            p.y = this.point[i].y;
            p.z = this.point[i].z;
            p.rotateX(this.rotation);
            p.rotateY(this.rotation);
            p.rotateZ(this.rotation);
            x = p.getProjection(this.distance, p.x, w / 2.0, 100.0);
            y = p.getProjection(this.distance, p.y, h / 2.0, 100.0);
            p.draw(x, y);
        }
    }
    update() {
        this.rotation += pi / 360.0;
        this.distance = 900;
    }
}
const toroide = new Torus();
function draw() {
    window.requestAnimationFrame(draw);
    $.save();
    $.clearRect(0, 0, w, h);
    toroide.draw();
    $.restore();
    toroide.update();
}

document.getElementById("play").addEventListener("click", draw);