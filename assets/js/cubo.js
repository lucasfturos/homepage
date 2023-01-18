const c = document.getElementById("esfera3d");
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
    rotateY(amount) {
        let x = this.x;
        this.x = x * Math.cos(amount) + this.z * Math.sin(amount) * -1.0;
        this.z = x * Math.sin(amount) + this.z * Math.cos(amount);
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

class Sphere {
    constructor(cubeWidth = 20, vertexQuantity = 20) {
        this.point = [];
        this.color = "rgb(255,255,255)";
        this.cubeWidth = cubeWidth;
        this.numVertexes = 0;
        this.vertexQuantity = vertexQuantity;
        this.rotation = 0;
        this.distance = 0;
        this.init();
    }
    init() {
        let increment = pi / this.vertexQuantity;
        for (let alpha = increment; alpha <= pi; alpha += increment) {
            for (let beta = increment; beta <= pi; beta += increment) {
                for (let phi = increment; phi < pi; phi += increment) {
                    let p = (this.point[this.numVertexes] = new Point());

                    this.numVertexes++;
                }
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
            p.rotateY(this.rotation);
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
const esfera = new Sphere();
function draw() {
    window.requestAnimationFrame(draw);
    $.save();
    $.clearRect(0, 0, w, h);
    esfera.draw();
    $.restore();
    esfera.update();
}

document.getElementById("play").addEventListener("click", draw);