import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() activeSection = 'accueil';
  @Input() scrolled = false;

  @Output() navigate = new EventEmitter<string>();

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onNavClick(sectionId: string): void {
    this.menuOpen = false;
    this.navigate.emit(sectionId);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) {
      this.menuOpen = false;
    }
  }
}
