import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skillCategories = [
    {
      title: 'Backend',
      icon: 'fas fa-server',
      skills: [
        { icon: 'fab fa-java', label: 'Java / Spring Boot' },
        { icon: 'fab fa-python', label: 'Python / Django' },
        { icon: 'fab fa-php', label: 'PHP' },
        { icon: 'fas fa-plug', label: 'API REST' },
        { icon: 'fas fa-shield-alt', label: 'JWT' }
      ]
    },
    {
      title: 'Frontend',
      icon: 'fas fa-laptop-code',
      skills: [
        { icon: 'fab fa-angular', label: 'Angular 17' },
        { icon: 'fab fa-js', label: 'JavaScript' },
        { icon: 'fab fa-js', label: 'TypeScript' },
        { icon: 'fab fa-html5', label: 'HTML5' },
        { icon: 'fab fa-css3-alt', label: 'CSS3 / SASS' },
        { icon: 'fab fa-bootstrap', label: 'Bootstrap' },
        { icon: 'fas fa-wind', label: 'Tailwind CSS' },
        { icon: 'fab fa-js', label: 'jQuery' }
      ]
    },
    {
      title: 'Base de données',
      icon: 'fas fa-database',
      skills: [
        { icon: 'fas fa-database', label: 'MySQL' },
        { icon: 'fas fa-database', label: 'PostgreSQL' },
        { icon: 'fas fa-layer-group', label: 'JPA / Hibernate' },
        { icon: 'fas fa-plug', label: 'JDBC' }
      ]
    },
    {
      title: 'Outils & Méthodologies',
      icon: 'fas fa-tools',
      skills: [
        { icon: 'fab fa-git-alt', label: 'Git / GitHub' },
        { icon: 'fab fa-figma', label: 'Figma' },
        { icon: 'fas fa-project-diagram', label: 'UML' },
        { icon: 'fas fa-sitemap', label: 'MERISE' },
        { icon: 'fas fa-users', label: 'Méthodes Agiles' },
        { icon: 'fab fa-adobe', label: 'Photoshop / Illustrator' }
      ]
    }
  ];

  languages = [
    { name: 'Malagasy', level: 'Natif' },
    { name: 'Français', level: 'Intermédiaire (B1/B2)' },
    { name: 'Anglais', level: 'Intermédiaire (B1)' },
    { name: 'Allemand', level: 'Débutant (A1)' }
  ];

  interests = [
    { icon: 'fas fa-futbol', label: 'Football' },
    { icon: 'fas fa-basketball-ball', label: 'Basketball' },
    { icon: 'fas fa-gamepad', label: 'Jeux vidéo' },
    { icon: 'fas fa-newspaper', label: 'Veille technologique' }
  ];
}
