import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

// * Categories
import { CategoryService } from '../../service/category.service';
import ICategory from '../../../types/ICategory';
import { NgIf } from '@angular/common';

// * Products
import { EditorComponent } from '../../component/product/editor/editor.component';
import { AuthenticationService } from '../../service/authentication.service';
import { ProductComponent } from '../../component/product/product.component';
import { ReportingService } from '../../service/reporting.service';
import { ProductService } from '../../service/product.service';
import IProduct from '../../../types/IProduct';
import RoleEnum from '../../../types/RoleEnum';

@Component({
  imports: [ProductComponent, EditorComponent, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  selector: 'app-products',
  standalone: true,
})
export class ProductsComponent implements OnInit {
  private catservice = inject(CategoryService);
  private reporter = inject(ReportingService);
  private service = inject(ProductService);
  protected categories: Array<ICategory> = [];
  protected products: Array<IProduct> = [];
  protected canAggregate = inject(AuthenticationService)
    .hasRole(RoleEnum.SUPER_ADMIN_ROLE);
  protected offcanvas = new Subject<{
    product: IProduct;
    categories: Array<ICategory>;
    onCreated: (product: IProduct) => undefined;
    onDeleted: (product: IProduct) => undefined;
  }>();

  private addProduct(product: IProduct) {
    this.products.push(product);
    return void 0;
  }

  protected removeProduct(product: IProduct) {
    this.products = this.products
      .filter((p) => p.id !== product.id);
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
          onDeleted: (product: IProduct) => void 0,
        });
      });
  }

  public ngOnInit() {
    const product = {} as IProduct;
    this.service
      .obtain(product)
      .subscribe({
        next: (products) => {
          this.products = products;
          this.reporter
            .info("Productos cargados correctamente.");
        },
        error: (error) => this.reporter.error("Error al cargar los productos."),
      });

    const category = {} as ICategory;
    this.catservice
      .obtain(category)
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          console.log(this.canAggregate, this.categories.length);
          if (this.canAggregate && this.categories.length <= 0) {
            this.reporter
              .warn("Sin categorías, por favor, cree una.");
            this.reporter
              .warn("Agregar producto deshabilitado.");
            
          }
        },
        error: (error) => this.reporter.error("Error al cargar las categorías."),
      });
  }
}