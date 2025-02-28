class Fire {
    constructor(canvasID, sliderID, directionSliderID) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext("2d");

        this.slider = document.getElementById(sliderID);
        this.fireSpreadFactor = this.slider.value;

        this.directionSlider = document.getElementById(directionSliderID);
        this.fireDirection = parseInt(this.directionSlider.value);

        this.firePixels = [];
        this.baseWidth = 100;
        this.baseHeight = 80;

        this.setup();
        window.addEventListener("resize", () => this.onResize());
        this.handleEvent();
    }

    setup() {
        const scaleFactor = 0.8;
        const scale = Math.min(
            (window.innerWidth / this.baseWidth) * scaleFactor,
            (window.innerHeight / this.baseHeight) * scaleFactor
        );

        this.pixelWidth = Math.max(1, Math.floor(scale));
        this.pixelHeight = this.pixelWidth;
        this.fireWidth = Math.floor(window.innerWidth / this.pixelWidth / 2);
        this.fireHeight = Math.floor(window.innerHeight / this.pixelHeight / 2);

        this.canvas.width = this.fireWidth * this.pixelWidth;
        this.canvas.height = this.fireHeight * this.pixelHeight;

        this.createDataStructure();
    }

    createDataStructure() {
        this.firePixels = Array.from(
            { length: this.fireWidth * this.fireHeight },
            () => ({
                fireIntensity: 0,
                windIntensity: 0,
            })
        );
    }

    createSpread() {
        for (let row = this.fireHeight - 1; row >= 0; row--) {
            for (let col = 0; col < this.fireWidth; col++) {
                const pixelIndex = col + this.fireWidth * row;
                this.updateIntensityPerPixel(pixelIndex);
            }
        }

        this.render();
        requestAnimationFrame(() => this.createSpread());
    }

    createSource() {
        for (let col = 0; col < this.fireWidth; col++) {
            const pixelIndex = (this.fireHeight - 1) * this.fireWidth + col;
            this.firePixels[pixelIndex] = {
                fireIntensity: Math.floor(Math.random() * (70 - 51) + 51),
                windIntensity: this.fireDirection,
            };
        }
    }

    handleEvent() {
        this.slider.addEventListener(
            "input",
            (e) => (this.fireSpreadFactor = e.target.value)
        );
        this.directionSlider.addEventListener(
            "input",
            (e) => (this.fireDirection = parseInt(e.target.value))
        );
    }

    updateIntensityPerPixel(currentPixelIndex) {
        const belowPixelIndex = currentPixelIndex + this.fireWidth;
        if (belowPixelIndex >= this.fireWidth * this.fireHeight) return;

        const fireIntensityDecay = Math.floor(
            Math.random() * this.fireSpreadFactor
        );

        const belowPixel = this.firePixels[belowPixelIndex];
        let newFireIntensity = Math.max(
            0,
            belowPixel.fireIntensity - fireIntensityDecay
        );

        let spreadDirection = 0;
        switch (this.fireDirection) {
            case -1: // Left Wind
                spreadDirection = Math.floor(Math.random() < 0.5 ? 0 : -1);
                break;
            case 0: // Wind from both sides
                spreadDirection = Math.floor(Math.random() < 0.1 ? -1 : 1);
                break;
            case 1: // Right Wind
                spreadDirection = Math.floor(Math.random() < 0.5 ? 1 : 0);
                break;
            default:
                break;
        }

        const crossPixelIndex = currentPixelIndex + spreadDirection;
        if (crossPixelIndex >= 0 && crossPixelIndex < this.firePixels.length) {
            this.firePixels[crossPixelIndex] = {
                fireIntensity: newFireIntensity,
                windIntensity: belowPixel.windIntensity,
            };
        }

        this.firePixels[currentPixelIndex] = {
            fireIntensity: newFireIntensity,
            windIntensity: belowPixel.windIntensity,
        };
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let row = 0; row < this.fireHeight; row++) {
            for (let col = 0; col < this.fireWidth; col++) {
                const index = col + this.fireWidth * row;
                const pixel = this.firePixels[index];

                if (pixel.fireIntensity > 0) {
                    const colorH = Math.round(
                        20 + (pixel.fireIntensity * 40) / 100
                    );
                    const colorL = Math.min(100, pixel.fireIntensity + 20);
                    const color = `hsl(${colorH}, 100%, ${colorL}%)`;
                    const x = col * this.pixelWidth;
                    const y = row * this.pixelHeight;

                    this.ctx.fillStyle = color;
                    this.ctx.fillRect(x, y, this.pixelWidth, this.pixelHeight);
                }
            }
        }
    }

    onResize() {
        this.setup();
        this.createSource();
    }

    run() {
        this.createSource();
        this.createSpread();
        setInterval(() => this.createSource(), 1000);
    }
}

const fire = new Fire("fire", "fireIntensity", "fireDirection");
fire.run();
