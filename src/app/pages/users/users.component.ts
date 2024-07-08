import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import IUser from '../../../types/IUser';
import { UserComponent } from "../../component/user/user.component";

@Component({
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, UserComponent]
})
export class UsersComponent implements OnInit {
  private service = inject(UserService);
  protected users = [] as Array<IUser>;

  protected reload(): void {
    const user = {} as IUser;
    this.service
      .obtain(user)
      .subscribe(r => this.users = r);
  }

  public ngOnInit(): void {
    this.reload();
  }
}
