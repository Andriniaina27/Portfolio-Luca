import { Component, HostListener, OnInit } from '@angular/core';
import { ParticlesComponent } from './components/particles/particles.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ParcoursComponent } from './components/parcours/parcours.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ParticlesComponent,
    HeaderComponent,
    HeroComponent,
    ProjectsComponent,
    SkillsComponent,
    ParcoursComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly sections = ['accueil', 'projets', 'competences', 'parcours', 'contact'];

  activeSection = 'accueil';
  headerScrolled = false;
  showBackToTop = false;

  ngOnInit(): void {
    document.body.classList.add('loaded');
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.headerScrolled = window.scrollY > 50;
    this.showBackToTop = window.scrollY > 50;
    this.updateActiveSection();
  }

  onNavigate(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateActiveSection(): void {
    const scrollPos = window.scrollY + 100;

    for (const id of this.sections) {
      const section = document.getElementById(id);
      if (!section) continue;

      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        this.activeSection = id;
        break;
      }
    }
  }
}
