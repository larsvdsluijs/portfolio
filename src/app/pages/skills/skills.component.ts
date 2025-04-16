import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  image: string;
  category: 'frontend' | 'backend' | 'database' | 'language';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [
    // Frontend skills
    { name: 'HTML', image: 'assets/img/skills/html-removebg-preview.png', category: 'frontend' },
    { name: 'CSS', image: 'assets/img/skills/css-removebg-preview.png', category: 'frontend' },
    { name: 'JavaScript', image: 'assets/img/skills/javascript-removebg-preview.png', category: 'frontend' },
    { name: 'TypeScript', image: 'assets/img/skills/typescript-removebg-preview.png', category: 'frontend' },
    { name: 'Angular', image: 'assets/img/skills/angular-removebg-preview.png', category: 'frontend' },
    { name: 'Vue', image: 'assets/img/skills/vue-removebg-preview.png', category: 'frontend' },
    
    // Backend skills
    { name: 'Springboot', image: 'assets/img/skills/springboot-removebg-preview.png', category: 'backend' },
    { name: 'ASP.NET', image: 'assets/img/skills/asp-removebg-preview.png', category: 'backend' },
    { name: 'PHP', image: 'assets/img/skills/php-removebg-preview.png', category: 'backend' },
    
    // Database skills
    { name: 'MySQL', image: 'assets/img/skills/mysql-removebg-preview.png', category: 'database' },
    { name: 'MongoDB', image: 'assets/img/skills/mongodb-removebg-preview.png', category: 'database' },
    
    // Languages
    { name: 'Dutch', image: 'assets/img/skills/dutch-removebg-preview.png', category: 'language' },
    { name: 'English', image: 'assets/img/skills/english-removebg-preview.png', category: 'language' }
  ];

  // Categorized skills
  frontendSkills: Skill[] = [];
  backendSkills: Skill[] = [];
  databaseSkills: Skill[] = [];
  languageSkills: Skill[] = [];

  constructor() { }

  ngOnInit(): void {
    this.frontendSkills = this.skills.filter(skill => skill.category === 'frontend');
    this.backendSkills = this.skills.filter(skill => skill.category === 'backend');
    this.databaseSkills = this.skills.filter(skill => skill.category === 'database');
    this.languageSkills = this.skills.filter(skill => skill.category === 'language');
  }
}