import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const scene = new THREE.Scene();
const earthDiv = document.querySelector(".earth");

const camera = new THREE.PerspectiveCamera(
    70,
    earthDiv.clientWidth / earthDiv.clientHeight,
    0.1,
    1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(earthDiv.clientWidth, earthDiv.clientHeight);
earthDiv.appendChild(renderer.domElement);
renderer.setAnimationLoop(animate);

const loader = new THREE.TextureLoader();
const dayTexture = loader.load(
    "https://raw.githubusercontent.com/lucasfturos/myhomepage-image/refs/heads/main/img/computerGraphics/earthmap.jpg"
);
const nightTexture = loader.load(
    "https://raw.githubusercontent.com/lucasfturos/myhomepage-image/refs/heads/main/img/computerGraphics/earth_nightmap.jpg"
);
const cloudsTexture = loader.load(
    "https://raw.githubusercontent.com/lucasfturos/myhomepage-image/refs/heads/main/img/computerGraphics/earth_clouds.jpg"
);

const earthGeometry = new THREE.SphereGeometry(1, 64, 64);

let earthRotation = 0;

const earthMaterial = new THREE.ShaderMaterial({
    uniforms: {
        dayTex: { value: dayTexture },
        nightTex: { value: nightTexture },
        sunDir: { value: new THREE.Vector3(1, 0, 0) },
        rotation: { value: 0 },
    },
    vertexShader: `
        varying vec3 vNormal;
        
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D dayTex;
        uniform sampler2D nightTex;
        uniform vec3 sunDir;
        uniform float rotation;

        varying vec3 vNormal;

        const float PI = ${Math.PI};
        const float TWO_PI = 2.0 * PI;

        void main() {
            float cosR = cos(rotation);
            float sinR = sin(rotation);
            vec3 n = vNormal;
            vec3 rotatedNormal =
                vec3(cosR * n.x + sinR * n.z, n.y, -sinR * n.x + cosR * n.z);
            float dotLN = dot(normalize(rotatedNormal), normalize(sunDir));
            vec2 uv =
                vec2(1.0 - (atan(rotatedNormal.z, rotatedNormal.x) / TWO_PI + 0.5),
                    (asin(rotatedNormal.y) / PI + 0.5));
            vec4 dayColor = texture2D(dayTex, uv);
            vec4 nightColor = texture2D(nightTex, uv);
            float factor = clamp(dotLN, 0.0, 1.0);
            gl_FragColor = mix(nightColor, dayColor, factor);
        }
    `,
});

const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

const cloudsMaterial = new THREE.ShaderMaterial({
    uniforms: {
        cloudsTex: { value: cloudsTexture },
        rotation: { value: 0 },
        opacity: { value: 0.2 },
    },
    vertexShader: `
        varying vec3 vNormal;

        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D cloudsTex;
        uniform float rotation;
        uniform float opacity;

        varying vec3 vNormal;

        const float PI = ${Math.PI};
        const float TWO_PI = 2.0 * PI;

        void main() {
            float cosR = cos(rotation);
            float sinR = sin(rotation);
            vec3 n = vNormal;
            vec3 rotatedNormal =
                vec3(cosR * n.x + sinR * n.z, n.y, -sinR * n.x + cosR * n.z);
            vec2 uv =
                vec2(1.0 - (atan(rotatedNormal.z, rotatedNormal.x) / TWO_PI + 0.5),
                    (asin(rotatedNormal.y) / PI + 0.5));
            vec4 cloudColor = texture2D(cloudsTex, uv);
            gl_FragColor = vec4(cloudColor.rgb, cloudColor.a * opacity);
        }
    `,
    transparent: true,
});

const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.02, 64, 64),
    cloudsMaterial
);
scene.add(clouds);

function updateSunDirection() {
    const now = new Date();
    const hours =
        now.getUTCHours() +
        now.getUTCMinutes() / 60 +
        now.getUTCSeconds() / 3600;
    const angle = (hours / 24) * Math.PI * 2 - Math.PI / 2;
    earthMaterial.uniforms.sunDir.value
        .set(Math.sin(angle), 0, Math.cos(angle))
        .normalize();
}
updateSunDirection();
setInterval(updateSunDirection, 1000);

function animate() {
    earthRotation += 0.01;
    earthMaterial.uniforms.rotation.value = earthRotation;
    cloudsMaterial.uniforms.rotation.value = earthRotation * 0.6;
    renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
    const width = earthDiv.clientWidth;
    const height = earthDiv.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

const minZoom = 2;
const maxZoom = 5;
const zoomSpeed = 0.05;

earthDiv.addEventListener("wheel", function (event) {
    event.preventDefault();
    camera.position.z += event.deltaY * zoomSpeed;
    camera.position.z = Math.max(minZoom, Math.min(maxZoom, camera.position.z));
});

let touchStartY = null;

earthDiv.addEventListener("touchstart", function (event) {
    if (event.touches.length === 1) touchStartY = event.touches[0].clientY;
});

earthDiv.addEventListener("touchmove", function (event) {
    if (touchStartY !== null && event.touches.length === 1) {
        let touchY = event.touches[0].clientY;
        let delta = touchStartY - touchY;
        camera.position.z += delta * 0.01;
        camera.position.z = Math.max(
            minZoom,
            Math.min(maxZoom, camera.position.z)
        );
        touchStartY = touchY;
    }
});

earthDiv.addEventListener("touchend", function () {
    touchStartY = null;
});
