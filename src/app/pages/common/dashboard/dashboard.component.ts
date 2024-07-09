import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { AuthenticationService } from '../../../service/authentication.service';
import RoleEnum from '../../../../types/RoleEnum';

@Component({
  imports: [RouterLink,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  selector: 'app-dashboard',
  standalone: true,
})
export class DashboardComponent {
  protected canAccess = inject(AuthenticationService)
    .hasRole(RoleEnum.SUPER_ADMIN_ROLE);
}
