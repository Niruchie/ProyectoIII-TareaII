import { Component, inject, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { NgbCollapse, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from '../../service/authentication.service';
import RoleEnum from '../../../types/RoleEnum';

@Component({
  imports: [
    RouterLinkActive,
    RouterLink,
    NgbCollapse,
    NgbModule,
    NavigationComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  selector: 'app-navigation',
  standalone: true,
})
export class NavigationComponent implements OnInit{
  private service = inject(AuthenticationService);
  private router = inject(Router);
  protected isNavbarCollapsed = true;
  protected authenticated = false;
  protected administator = false;

  protected doLogout(){
    this.service.logout();
    this.router.navigate(['/login']);
  }

  private reloadPermissions(){
    this.authenticated = this.service.isAuthenticated();
    this.administator = this.service.hasRole(RoleEnum.SUPER_ADMIN_ROLE);
  }

  public ngOnInit(): void {
    this.service
      .events
      .subscribe((e) => this.reloadPermissions());
    this.service.capture();
  }
}
