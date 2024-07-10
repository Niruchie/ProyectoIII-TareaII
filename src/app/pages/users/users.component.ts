import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import IUser from '../../../types/IUser';
import { UserComponent } from "../../component/user/user.component";
import { ReportingService } from '../../service/reporting.service';

@Component({
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, UserComponent]
})
export class UsersComponent implements OnInit {
  private service = inject(UserService);
  private reporter = inject(ReportingService);
  protected users = [] as Array<IUser>;

  protected reload(): void {
    const user = {} as IUser;
    this.service
      .obtain(user)
      .subscribe({
        next: (users) => {
          this.users = users;
          this.reporter
            .info("Usuarios cargados correctamente.");
        },
        error: (error) => this.reporter.error("Error al cargar los usuarios.")
      });
  }

  public ngOnInit(): void {
    this.reload();
  }
}
