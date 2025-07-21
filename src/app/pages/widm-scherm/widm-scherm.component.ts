import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService, ScreenState } from '../../services/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widm-scherm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widm-scherm.component.html',
  styleUrls: ['./widm-scherm.component.scss']
})
export class WidmSchermComponent implements OnInit, OnDestroy {
  screenState: ScreenState = {
    selectedScreen: null
  };
  
  private subscription: Subscription | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Luister naar Firebase updates
    this.subscription = this.firebaseService.getScreenState().subscribe(
      (state: ScreenState) => {
        this.screenState = state;
      },
      (error) => {
        console.error('Error getting screen state:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getCurrentImageUrl(): string {
    switch (this.screenState.selectedScreen) {
      case 'green':
        return 'assets/img/widm/green-screen.png';
      case 'default':
        return 'assets/img/widm/default-screen.webp';
      case 'red':
        return 'assets/img/widm/red-screen.png';
      default:
        return 'assets/img/placeholder.png';
    }
  }

  getScreenText(): string {
    switch (this.screenState.selectedScreen) {
      case 'green':
        return 'Groen scherm';
      case 'default':
        return 'Standaard scherm';
      case 'red':
        return 'Rood scherm';
      default:
        return 'Geen scherm geselecteerd';
    }
  }

  onImageError(event: any): void {
    // Fallback naar placeholder als afbeelding niet laadt
    event.target.src = 'assets/img/placeholder.png';
  }
} 