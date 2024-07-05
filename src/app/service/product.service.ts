import { Injectable } from '@angular/core';

import { CrudBaseService } from './crud.base.service';
import IProduct from '../../types/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudBaseService<IProduct> {
  protected override service = 'producto';
}
