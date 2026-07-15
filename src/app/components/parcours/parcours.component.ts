import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-parcours',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './parcours.component.html',
  styleUrl: './parcours.component.css'
})
export class ParcoursComponent {
  timeline = [
    {
      date: '2025 - 2026',
      title: 'Stage Développeur Full-Stack',
      subtitle: 'CNaPS (Caisse Nationale de Prévoyance Sociale)',
      description:
        'Développement du Portail RH Unifié : conception et implémentation de 11 modules (pointage, congés, absences, planning, GEPP, actualités, bulletin de paie). Stack : Angular 17, Spring Boot, MySQL, JWT. Mise en place de la sécurisation du pointage par code PIN et automatisation des notifications.'
    },
    {
      date: '2024 - 2025',
      title: 'Projets Académiques',
      subtitle: 'IS-INFO Ampasamadinika',
      description:
        "Réalisation de projets full-stack : Abonnement360 (Django/Python) pour la gestion d'abonnements, Plateforme Immobilière (PHP/MySQL) pour la gestion de biens et contrats de location. Application des méthodologies MERISE et UML."
    },
    {
      date: '2022 - 2026',
      title: 'Licence Professionnelle en Informatique de Gestion',
      subtitle: 'IS-INFO Ampasamadinika',
      description:
        'Formation en développement web, bases de données, gestion de projet et méthodologies agiles. Spécialisation en développement full-stack.'
    },
    {
      date: '2021 - 2022',
      title: 'Baccalauréat série D',
      subtitle: 'Lycée Privé La Flèche Andoharanofotsy',
      description:
        "Baccalauréat scientifique. Premiers pas dans l'informatique et les sciences."
    }
  ];
}
