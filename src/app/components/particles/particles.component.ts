import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';

class Particle {
  x = 0;
  y = 0;
  size = 0;
  speedX = 0;
  speedY = 0;
  opacity = 0;

  constructor(
    private readonly getWidth: () => number,
    private readonly getHeight: () => number
  ) {
    this.reset();
  }

  reset(): void {
    this.x = Math.random() * this.getWidth();
    this.y = Math.random() * this.getHeight();
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update(): void {
    const width = this.getWidth();
    const height = this.getHeight();

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
    ctx.fill();
  }
}

@Component({
  selector: 'app-particles',
  standalone: true,
  template: `<canvas #canvas id="particles-canvas" aria-hidden="true"></canvas>`,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId = 0;
  private visibilityHandler = () => this.onVisibilityChange();

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;

    this.ctx = context;
    this.resizeCanvas();
    this.initParticles();
    this.animateParticles();
    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    document.removeEventListener('visibilitychange', this.visibilityHandler);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
    this.initParticles();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private initParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    this.particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
    const getWidth = () => canvas.width;
    const getHeight = () => canvas.height;

    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(getWidth, getHeight));
    }
  }

  private drawConnections(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(100, 255, 218, ${0.08 * (1 - distance / 120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  private animateParticles = (): void => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(this.ctx);
    });

    this.drawConnections();
    this.animationId = requestAnimationFrame(this.animateParticles);
  };

  private onVisibilityChange(): void {
    if (document.hidden) {
      cancelAnimationFrame(this.animationId);
    } else {
      this.animateParticles();
    }
  }
}
