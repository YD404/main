(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80; // パーティクルの数
    const maxDistance = 120; // 線を結ぶ最大距離

    let currentParticleBaseColor = ''; // To store 'rgb(x,y,z)' or '#hex'
    let currentLineBaseColor = '';     // To store 'rgb(x,y,z)' or '#hex'

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function updateParticleColors() {
        const computedStyle = getComputedStyle(document.body);
        currentParticleBaseColor = computedStyle.getPropertyValue('--text-color-primary').trim();
        currentLineBaseColor = computedStyle.getPropertyValue('--line-color').trim();
    }

    function Particle(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // X方向の速度
        this.vy = (Math.random() - 0.5) * 0.5; // Y方向の速度
        this.radius = Math.random() * 1.5 + 0.5; // 半径
    }

    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;

        // 画面端での跳ね返り
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };

    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Use currentParticleBaseColor with alpha
        ctx.fillStyle = currentParticleBaseColor.startsWith('rgb') ?
                        currentParticleBaseColor.replace(')', ', 0.8)') : // For rgb(x,y,z) format
                        currentParticleBaseColor + 'D9'; // For #hex format (D9 is ~85% opacity)
        ctx.fill();
    };

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    // Use currentLineBaseColor with dynamic alpha
                    const alpha = 1 - (dist / maxDistance);
                    ctx.strokeStyle = currentLineBaseColor.startsWith('rgb') ?
                                      currentLineBaseColor.replace(')', `, ${alpha})`) : // For rgb(x,y,z) format
                                      currentLineBaseColor + Math.floor(alpha * 255).toString(16).padStart(2, '0'); // For #hex format
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // Canvasをbodyの最初の子要素として追加
    document.addEventListener('DOMContentLoaded', () => {
        document.body.prepend(canvas);
        canvas.id = 'particles-background';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-2'; // body:after の -1 より後ろに配置
        canvas.style.pointerEvents = 'none'; // クリックイベントを透過

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initial color update
        updateParticleColors();

        // Listen for theme changes
        window.addEventListener('themeChanged', updateParticleColors);

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        animate();
    });
})();