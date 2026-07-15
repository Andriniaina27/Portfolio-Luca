import { Component, OnDestroy, OnInit } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  typewriterText = '';

  private readonly phrases = [
    'Développeur Full-Stack',
    'Java / Spring Boot',
    'Angular 17',
    'Python / Django',
    'PHP / MySQL'
  ];

  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.timeoutId = setTimeout(() => this.typeWriter(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private typeWriter(): void {
    const currentPhrase = this.phrases[this.phraseIndex];
    let typeSpeed = 80;

    if (this.isDeleting) {
      this.charIndex--;
      this.typewriterText = currentPhrase.substring(0, this.charIndex);
      typeSpeed = 40;
    } else {
      this.charIndex++;
      this.typewriterText = currentPhrase.substring(0, this.charIndex);
      typeSpeed = 80;
    }

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      this.isDeleting = true;
      typeSpeed = 2000;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      typeSpeed = 500;
    }

    this.timeoutId = setTimeout(() => this.typeWriter(), typeSpeed);
  }
}
