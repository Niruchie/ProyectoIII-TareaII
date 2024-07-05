import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbCollapse, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';


@Component({
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    NgbCollapse,
    NgbModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  selector: 'app-root',
  standalone: true,
})
export class AppComponent {
  protected isLoggedIn = false;
  protected isNavbarCollapsed = true;
  protected title = 'proyecto-iii-tarea-ii';

  constructor(private authorization: AuthenticationService, private router: Router) {
    this.authorization
      .events
      .subscribe((e) => this.isLoggedIn = e);
  }

  protected doLogout(){
    this.authorization.logout();
    this.router.navigate(['/login']);
  }
}
