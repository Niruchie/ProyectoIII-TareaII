import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ProductService } from '../../../service/product.service';
import ICategory from '../../../../types/ICategory';
import IProduct from '../../../../types/IProduct';
import { ReportingService } from '../../../service/reporting.service';

@Component({
  imports: [EditorComponent, CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  selector: 'app-product-editor',
  standalone: true,
})
export class EditorComponent {
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

  @Input()
  events!: Observable<{
    product: IProduct;
    categories: Array<ICategory>;
    onCreated: (product: IProduct) => undefined;
    onDeleted: (product: IProduct) => undefined;
  }>;


  private service = inject(ProductService);
  private reporter = inject(ReportingService);
  protected addCreatedProduct = (product: IProduct) => void 0;
  protected addDeletedProduct = (product: IProduct) => void 0;
  protected categories: Array<ICategory> = [];
  protected product = {} as IProduct;
  protected open = false;

  private cleanErrors() {
    this.cantidadEnStock.control.setErrors(null);
    this.descripcion.control.setErrors(null);
    this.categoria.control.setErrors(null);
    this.nombre.control.setErrors(null);
    this.precio.control.setErrors(null);
  }

  private cleanEditor() {
    if (!this.product.id) {
      this.product = {} as IProduct;
      this.cantidadEnStock.control.reset();
      this.descripcion.control.reset();
      this.categoria.control.reset();
      this.precio.control.reset();
      this.nombre.control.reset();
    }

    this.cleanErrors();
  }

  protected closeEditor() {
    this.cleanEditor();
    this.open = false;
    return this.open;
  }

  protected async save() {
    const precio = Number(this.precio.value);
    const categoriaId = Number(this.categoria.value);
    const cantidadEnStock = Number(this.cantidadEnStock.value);

    if (!this.nombre.valid || this.nombre.value === '') {
      this.nombre.control.setErrors({ required: true });
      this.nombre.control.markAsTouched();
      return;
    }

    if (!this.descripcion.valid || this.descripcion.value === '') {
      this.descripcion.control.setErrors({ required: true });
      this.descripcion.control.markAsTouched();
      return;
    }

    if (!this.precio.valid || isNaN(precio) || precio < 0) {
      this.precio.control.setErrors({ required: true });
      this.precio.control.markAsTouched();
      return;
    }

    if (!this.cantidadEnStock.valid || isNaN(cantidadEnStock) || cantidadEnStock < 0) {
      this.cantidadEnStock.control.setErrors({ required: true });
      this.cantidadEnStock.control.markAsTouched();
      return;
    }

    if (isNaN(categoriaId) || !this.categories.map((category) => category.id).includes(categoriaId)) {
      this.categoria.control.setErrors({ required: true });
      this.categoria.control.markAsTouched();
      return;
    }

    this.product.precio = precio;
    this.product.nombre = this.nombre.value;
    this.product.cantidadEnStock = cantidadEnStock;
    this.product.descripcion = this.descripcion.value;
    this.product.categoria = this.categories
      .find((category) => category.id === categoriaId)!;

    if (!this.product.categoria) {
      this.categoria.control.setErrors({ required: true });
      this.categoria.control.markAsTouched();
      return;
    }

    if (this.product.id) {
      this.service
        .update(this.product)
        .subscribe({
          next: () => {
            this.closeEditor();
            this.cleanEditor();
            this.reporter
              .success("El producto ha sido actualizado con éxito.");
          },
          error: (error) => this.reporter.error("Ha ocurrido un error al actualizar el producto."),
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
            this.reporter
              .success("El producto ha sido creado con éxito.");
          },
          error: (error) => this.reporter.error("Ha ocurrido un error al crear el producto."),
        });
    }
  }

  protected async delete() {
    if (!this.product.id) {
      return;
    }

    this.service
      .delete(this.product)
      .subscribe({
        next: () => {
          this.addDeletedProduct(this.product);
          this.closeEditor();
          this.cleanEditor();
          this.reporter
            .success("El producto ha sido eliminado con éxito.");
        },
        error: (error) => this.reporter.error("Ha ocurrido un error al eliminar el producto."),
      });
  }

  public ngOnInit() {
    this.events
      .subscribe({
        next: (event) => {
          this.addDeletedProduct = event.onDeleted;
          this.addCreatedProduct = event.onCreated;
          this.categories = event.categories;
          this.product = event.product;

          if (this.product.categoria) {
            this.categoria.control.setValue(this.product.categoria.id);
          }

          this.cantidadEnStock.control.setValue(this.product.cantidadEnStock);
          this.descripcion.control.setValue(this.product.descripcion);
          this.nombre.control.setValue(this.product.nombre);
          this.precio.control.setValue(this.product.precio);
          this.open = true;
        },
      });
  }
}
