import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink: string;
  demoLink: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Hitster app',
      description: 'An online app form of the card game Hitster.',
      image: 'assets/img/projects/hitster_app.png',
      tags: ['Angular', 'TypeScript'],
      githubLink: '',
      demoLink: 'https://kvatlantis.nl/beheer/hitster/'
    },
    {
      title: 'Tic Tac Toe app',
      description: 'A simple Tic Tac Toe game built with Angular and TypeScript.',
      image: 'assets/img/projects/tictactoe_app.png',
      tags: ['Angular', 'TypeScript'],
      githubLink: '',
      demoLink: 'https://larsvdsluijs.github.io/tictactoe/'
    },
    {
      title: 'Calculator app',
      description: 'A simple calculator app built with Angular and TypeScript.',
      image: 'assets/img/projects/calculator_app.png',
      tags: ['Angular', 'TypeScript'],
      githubLink: 'https://github.com/larsvdsluijs/rekenmachine',
      demoLink: 'https://larsvdsluijs.github.io/rekenmachine/'
    }
  ];
} 

