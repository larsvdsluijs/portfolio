import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService, ScreenState } from '../../services/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widm-knoppen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widm-knoppen.component.html',
  styleUrls: ['./widm-knoppen.component.scss']
})
export class WidmKnoppenComponent implements OnInit, OnDestroy {
  selectedButton: 'green' | 'default' | 'red' | null = null;
  private subscription: Subscription | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Luister naar Firebase updates
    this.subscription = this.firebaseService.getScreenState().subscribe(
      (state: ScreenState) => {
        this.selectedButton = state.selectedScreen;
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

  async selectButton(buttonType: 'green' | 'default' | 'red') {
    try {
      await this.firebaseService.updateSelectedScreen(buttonType);
    } catch (error) {
      console.error('Error updating selected screen:', error);
    }
  }

  getSelectedText(): string {
    switch (this.selectedButton) {
      case 'green':
        return 'Groen scherm';
      case 'default':
        return 'Standaard scherm';
      case 'red':
        return 'Rood scherm';
      default:
        return '';
    }
  }
} 