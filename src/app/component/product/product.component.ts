import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { CategoryService } from '../../service/category.service';
import ICategory from '../../../types/ICategory';
import IProduct from '../../../types/IProduct';
import { EditorComponent } from "./editor/editor.component";

@Component({
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    selector: 'app-product',
    standalone: true,
    imports: [CommonModule, EditorComponent]
})
export class ProductComponent {
  @Input({ required: true })
  public onDeleted!: (product: IProduct) => undefined;

  @Input({ required: true })
  public product!: IProduct;

  private catservice = inject(CategoryService);

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
