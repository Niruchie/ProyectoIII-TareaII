import { Component, inject, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subject } from 'rxjs';

import { AuthenticationService } from '../../service/authentication.service';
import { CategoryService } from '../../service/category.service';
import { EditorComponent } from "./editor/editor.component";
import ICategory from '../../../types/ICategory';
import IProduct from '../../../types/IProduct';
import RoleEnum from '../../../types/RoleEnum';

@Component({
  imports: [NgIf, EditorComponent],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    selector: 'app-product',
    standalone: true,
})
export class ProductComponent {
  @Input({ required: true })
  public onDeleted!: (product: IProduct) => undefined;

  @Input({ required: true })
  public product!: IProduct;

  private catservice = inject(CategoryService);
  protected canModify = inject(AuthenticationService)
    .hasRole(RoleEnum.SUPER_ADMIN_ROLE);
  protected offcanvas: Subject<{
    product: IProduct;
    categories: Array<ICategory>;
    onCreated: (product: IProduct) => undefined;
    onDeleted: (product: IProduct) => undefined;
  }> = new Subject();

  protected clickUpdateProduct() {
    const category = {} as ICategory;
    this.catservice
      .obtain(category)
      .subscribe((data) => {
        this.offcanvas.next({
          categories: data,
          product: this.product,
          onDeleted: this.onDeleted,
          onCreated: (product: IProduct) => void 0,
        });
      });
  }
}
