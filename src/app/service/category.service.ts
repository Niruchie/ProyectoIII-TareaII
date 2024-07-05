import { Injectable } from '@angular/core';

import { CrudBaseService } from './crud.base.service';
import ICategory from '../../types/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CrudBaseService<ICategory> {
  protected override service = 'categoria';
}
