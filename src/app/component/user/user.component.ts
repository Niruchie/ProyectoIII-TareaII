import { Component, Input } from '@angular/core';
import IUser from '../../../types/IUser';

@Component({
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  selector: 'app-user',
  standalone: true,
  imports: [],
})
export class UserComponent {
  @Input({ required: true })
  user!: IUser;
}
