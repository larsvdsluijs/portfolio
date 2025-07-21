import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'timeline',
    loadComponent: () => import('./pages/timeline/timeline.component').then(m => m.TimelineComponent)
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent)
  },
  {
    path: 'widm-knoppen',
    loadComponent: () => import('./pages/widm-knoppen/widm-knoppen.component').then(m => m.WidmKnoppenComponent)
  },
  {
    path: 'widm-scherm',
    loadComponent: () => import('./pages/widm-scherm/widm-scherm.component').then(m => m.WidmSchermComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
