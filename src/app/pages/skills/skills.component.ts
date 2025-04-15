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
    { name: 'HTML', image: 'assets/img/placeholder.png', category: 'frontend' },
    { name: 'CSS', image: 'assets/img/placeholder.png', category: 'frontend' },
    { name: 'JavaScript', image: 'assets/img/placeholder.png', category: 'frontend' },
    { name: 'TypeScript', image: 'assets/img/placeholder.png', category: 'frontend' },
    { name: 'Angular', image: 'assets/img/placeholder.png', category: 'frontend' },
    { name: 'Vue', image: 'assets/img/placeholder.png', category: 'frontend' },
    
    // Backend skills
    { name: 'Springboot', image: 'assets/img/placeholder.png', category: 'backend' },
    { name: 'ASP.NET', image: 'assets/img/placeholder.png', category: 'backend' },
    { name: 'PHP', image: 'assets/img/placeholder.png', category: 'backend' },
    
    // Database skills
    { name: 'MySQL', image: 'assets/img/placeholder.png', category: 'database' },
    { name: 'MongoDB', image: 'assets/img/placeholder.png', category: 'database' },
    
    // Languages
    { name: 'Dutch', image: 'assets/img/placeholder.png', category: 'language' },
    { name: 'English', image: 'assets/img/placeholder.png', category: 'language' }
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