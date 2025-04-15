import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../skills/skills.component';
import { TimelineComponent } from '../timeline/timeline.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SkillsComponent, TimelineComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {} 