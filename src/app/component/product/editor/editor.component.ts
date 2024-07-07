import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ProductService } from '../../../service/product.service';
import ICategory from '../../../../types/ICategory';
import IProduct from '../../../../types/IProduct';

@Component({
  imports: [EditorComponent, CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  selector: 'app-product-editor',
  standalone: true,
})
export class EditorComponent {
  @Input()
  events!: Observable<{
    product: IProduct;
    categories: Array<ICategory>;
    onCreated: (product: IProduct) => undefined;
    onUpdated: (product: IProduct) => undefined;
  }>;

  @ViewChild('nombre')
  nombre!: NgModel;

  @ViewChild('descripcion')
  descripcion!: NgModel;

  @ViewChild('precio')
  precio!: NgModel;

  @ViewChild('cantidadEnStock')
  cantidadEnStock!: NgModel;

  @ViewChild('categoria')
  categoria!: NgModel;

  constructor(private service: ProductService) {

  }

  ngOnInit() {
    this.events
      .subscribe({
        next: (event) => {
          this.addUpdatedProduct = event.onUpdated;
          this.addCreatedProduct = event.onCreated;
          this.categories = event.categories;
          this.product = event.product;
          this.open = true;
        },
      });
  }

  protected open = false;
  protected product = {} as IProduct;
  protected categories: Array<ICategory> = [];
  protected addUpdatedProduct = (product: IProduct) => void 0;
  protected addCreatedProduct = (product: IProduct) => void 0;

  protected cleanEditor() {
    this.nombre.control.reset();
    this.precio.control.reset();
    this.categoria.control.reset();
    this.descripcion.control.reset();
    this.cantidadEnStock.control.reset();
    this.product = {} as IProduct;
    return this.product;
  }

  protected closeEditor() {
    this.cleanEditor();
    this.open = false;
    return this.open;
  }

  protected async save() {
    const categoriaId = Number(this.categoria.value);

    if (!this.nombre.valid || this.nombre.value === '') {
      this.nombre.control.markAsTouched();
      return;
    }

    if (!this.descripcion.valid || this.descripcion.value === '') {
      this.descripcion.control.markAsTouched();
      return;
    }

    if (!this.precio.valid || this.precio.value === '') {
      this.precio.control.markAsTouched();
      return;
    }

    if (!this.cantidadEnStock.valid || this.cantidadEnStock.value === '') {
      this.cantidadEnStock.control.markAsTouched();
      return;
    }

    if (isNaN(categoriaId) || !this.categories.map((category) => category.id).includes(categoriaId)) {
      this.categoria.control.markAsTouched();
      return;
    }

    this.product.nombre = this.nombre.value;
    this.product.descripcion = this.descripcion.value;
    this.product.precio = this.precio.value;
    this.product.cantidadEnStock = this.cantidadEnStock.value;
    this.product.categoria = this.categories
      .find((category) => category.id === categoriaId)!;

    if (!this.product.categoria){
      this.categoria.control.markAsTouched();
      return;
    }

    if (this.product.id) {
      this.service
        .update(this.product)
        .subscribe({
          next: () => {
            this.addUpdatedProduct(this.product);
            this.closeEditor();
            this.cleanEditor();
          },
          error: (error) => console.error(error),
        });
    }
    else {
      this.service
        .create(this.product)
        .subscribe({
          next: (product) => {
            this.addCreatedProduct(product);
            this.closeEditor();
            this.cleanEditor();
          },
          error: (error) => console.error(error),
        });
    }
  }
}
