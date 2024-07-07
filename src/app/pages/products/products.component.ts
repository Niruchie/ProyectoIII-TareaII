import { Component } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

// * Categories
import { CategoryService } from '../../service/category.service';
import ICategory from '../../../types/ICategory';

// * Products
import { EditorComponent } from '../../component/product/editor/editor.component';
import { ProductComponent } from '../../component/product/product.component';
import { ProductService } from '../../service/product.service';
import IProduct from '../../../types/IProduct';

@Component({
  imports: [ProductComponent, EditorComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  selector: 'app-products',
  standalone: true,
})
export class ProductsComponent {
  protected categories: Array<ICategory> = [];
  protected products: Array<IProduct> = [];
  protected offcanvas = new Subject<{
    product: IProduct;
    categories: Array<ICategory>;
    onCreated: (product: IProduct) => undefined;
    onUpdated: (product: IProduct) => undefined;
  }>();

  constructor(private catservice: CategoryService, private service: ProductService) { }

  ngOnInit() {
    const product = {} as IProduct;
    this.service
      .obtain(product)
      .subscribe((data) => this.products = data);
  }

  private addProduct(product: IProduct) {
    this.products.push(product);
    return void 0;
  }

  protected clickAddProduct() {
    const category = {} as ICategory;
    this.catservice
      .obtain(category)
      .subscribe((data) => {
        this.categories = data;
        this.offcanvas.next({
          product: {} as IProduct,
          categories: this.categories,
          onCreated: this.addProduct.bind(this),
          onUpdated: (product: IProduct) => void 0,
        });
      });
  }
}