import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface Project {
  title: string;
  date: string;
  context: string;
  description: string;
  tags: string[];
  link: string;
  icon: string;
  imageClass: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgClass, RevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Portail RH Unifié',
      date: '2025 - 2026',
      context: 'Stage de 6 mois à la CNaPS',
      description:
        'Plateforme sécurisée de gestion RH avec 11 modules : pointage code PIN, congés, absences, planning, GEPP, actualités, bulletin de paie, etc. Défi relevé : sécurisation du pointage, automatisation des notifications, navigation en 3 clics maximum.',
      tags: ['Angular 17', 'Spring Boot', 'MySQL', 'JWT', 'Tailwind CSS'],
      link: 'https://github.com/Andriniaina27/Portail-RH',
      icon: 'fas fa-users-cog',
      imageClass: 'rh'
    },
    {
      title: 'Abonnement360',
      date: '2025',
      context: 'Projet académique',
      description:
        "Plateforme de gestion d'abonnements et de forfaits clients avec suivi, validation et analyse des données. Interface intuitive pour la gestion complète du cycle de vie des abonnements.",
      tags: ['Python', 'Django', 'Bootstrap', 'MySQL'],
      link: 'https://github.com/Andriniaina27/Projet-Django',
      icon: 'fas fa-sync-alt',
      imageClass: 'abo'
    },
    {
      title: 'Plateforme Immobilière',
      date: '2024',
      context: 'Projet académique',
      description:
        'Plateforme de gestion immobilière avec annonces, contrats de location et messagerie client-agence. Solution complète pour la gestion des biens et la relation client.',
      tags: ['PHP', 'MySQL', 'JavaScript', 'SASS', 'Bootstrap'],
      link: 'https://github.com/Andriniaina27/Projet-Php',
      icon: 'fas fa-building',
      imageClass: 'immo'
    }
  ];
}
