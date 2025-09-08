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

dayTexture.wrapS = dayTexture.wrapT = THREE.RepeatWrapping;
nightTexture.wrapS = nightTexture.wrapT = THREE.RepeatWrapping;
cloudsTexture.wrapS = cloudsTexture.wrapT = THREE.RepeatWrapping;

dayTexture.minFilter = dayTexture.magFilter = THREE.LinearFilter;
nightTexture.minFilter = nightTexture.magFilter = THREE.LinearFilter;
cloudsTexture.minFilter = cloudsTexture.magFilter = THREE.LinearFilter;

const earthGeometry = new THREE.SphereGeometry(1, 64, 64);

const axialTilt = 23.5 * Math.PI / 180;

const earthMaterial = new THREE.ShaderMaterial({
    uniforms: {
        dayTex: { value: dayTexture },
        nightTex: { value: nightTexture },
        sunDir: { value: new THREE.Vector3(1, 0, 0) },
        rotation: { value: 0 },
        axialTilt: { value: axialTilt },
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
        uniform float axialTilt;

        varying vec3 vNormal;

        const float PI = ${Math.PI};
        const float TWO_PI = 2.0 * PI;

        vec3 rotateY(vec3 v, float angle) {
            float c = cos(angle);
            float s = sin(angle);
            return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z);
        }

        vec3 rotateX(vec3 v, float angle) {
            float c = cos(angle);
            float s = sin(angle);
            return vec3(v.x, c * v.y - s * v.z, s * v.y + c * v.z);
        }

        void main() {
            vec3 n = vNormal;
            n = rotateY(n, rotation);
            n = rotateX(n, axialTilt);
            float dotLN = dot(normalize(n), normalize(sunDir));
            vec2 uv =
                vec2(1.0 - (atan(n.z, n.x) / TWO_PI + 0.5), (asin(n.y) / PI + 0.5));
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
        axialTilt: { value: axialTilt },
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
        uniform float axialTilt;
        uniform float opacity;

        varying vec3 vNormal;

        const float PI = ${Math.PI};
        const float TWO_PI = 2.0 * PI;

        vec3 rotateY(vec3 v, float angle) {
            float c = cos(angle);
            float s = sin(angle);
            return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z);
        }

        vec3 rotateX(vec3 v, float angle) {
            float c = cos(angle);
            float s = sin(angle);
            return vec3(v.x, c * v.y - s * v.z, s * v.y + c * v.z);
        }

        void main() {
            vec3 n = vNormal;
            n = rotateY(n, rotation);
            n = rotateX(n, axialTilt);
            vec2 uv =
                vec2(1.0 - (atan(n.z, n.x) / TWO_PI + 0.5), (asin(n.y) / PI + 0.5));
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
    const solarLongitude = (hours / 24) * Math.PI * 2 - Math.PI;
    earthMaterial.uniforms.sunDir.value
        .set(Math.cos(solarLongitude), 0, Math.sin(solarLongitude))
        .normalize();
}

let animationRotation = 0;

function animate() {
    updateSunDirection();
    animationRotation += 0.005;
    earth.rotation.y = animationRotation;
    clouds.rotation.y = animationRotation;

    earthMaterial.uniforms.rotation.value = earth.rotation.y;
    cloudsMaterial.uniforms.rotation.value = clouds.rotation.y;

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
