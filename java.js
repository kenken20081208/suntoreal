const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Drop {
    constructor(x, y, radius = 50) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 10;
        this.isVisible = true;
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height * 0.8 && this.isVisible) {
            ripples.push(new Ripple(this.x, this.y));
            this.isVisible = false;

            // ボタンの位置を波紋の場所に移動して表示
            startButton.style.left = `${this.x}px`;
            startButton.style.top = `${this.y}px`;
            startButton.style.display = "block";

            return false;
        }
        return true;
    }
    draw() {
        if (this.isVisible) {
            ctx.fillStyle = "rgba(0, 188, 212, 1)";
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.radius, this.radius * 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = 200;
        this.opacity = 1;
    }
    update() {
        this.radius += 5;
        this.opacity -= 0.01;
        return this.opacity > 0;
    }
    draw() {
        ctx.strokeStyle = `rgba(0, 188, 212, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

let drops = [new Drop(canvas.width / 2, 0, 50)];
let ripples = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops = drops.filter(drop => drop.update());
    ripples = ripples.filter(ripple => ripple.update());
    drops.forEach(drop => drop.draw());
    ripples.forEach(ripple => ripple.draw());
    requestAnimationFrame(animate);
}

animate();