import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface TimelineItem {
    icon: string;
    period: string;
    title: string;
    description: string;
    position: 'left' | 'right';
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  animations: [
    trigger('slideIn', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-100px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate('0.6s ease-out')
      ])
    ])
  ]
})
export class TimelineComponent implements OnInit {
    timelineItems: TimelineItem[] = [
      {
        icon: 'fas fa-laptop-code',
        period: '2024 - Present',
        title: 'Software Engineer',
        description: 'Part-time Software Engineer at Advisor Software Solutions. Working with Angular for frontend development and ASP.NET for backend solutions.',
        position: 'left'
      },
      {
        icon: 'fas fa-university',
        period: '2019 - Present',
        title: 'Software Engineering',
        description: 'Bachelor\'s degree in Software Engineering at Amsterdam University of Applied Sciences. Specializing in full-stack development with a focus on modern web technologies.',
        position: 'right'
      },
      {
        icon: 'fas fa-graduation-cap',
        period: '2014 - 2018',
        title: 'HAVO',
        description: 'Completed secondary education with a focus on science and technology.',
        position: 'left'
      }
    ];
  
    constructor() { }
  
    ngOnInit(): void {
      // Any initialization code if needed
    }
  }