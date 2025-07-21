import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  constructor(
    private scrollService: ScrollService,
    private router: Router
  ) {
    // The service will automatically handle scrolling on route changes
  }

  isWidmKnoppenRoute(): boolean {
    return this.router.url === '/widm-knoppen';
  }

  isWidmSchermRoute(): boolean {
    return this.router.url === '/widm-scherm';
  }

  shouldHideNavbar(): boolean {
    return this.isWidmKnoppenRoute() || this.isWidmSchermRoute();
  }
}
