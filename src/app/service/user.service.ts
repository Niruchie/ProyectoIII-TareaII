import { Injectable } from '@angular/core';
import { CrudBaseService } from './crud.base.service';
import IUser from '../../types/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudBaseService<IUser> {
  protected override service = '/users';
}
