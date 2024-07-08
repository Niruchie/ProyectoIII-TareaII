import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoryService } from '../../../service/category.service';
import ICategory from '../../../../types/ICategory';
import { Observable } from 'rxjs';

@Component({
  imports: [EditorComponent, CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  selector: 'app-category-editor',
  standalone: true,
})
export class EditorComponent implements OnInit {
  @ViewChild('nombre')
  protected nombre!: NgModel;

  @ViewChild('descripcion')
  protected descripcion!: NgModel;

  @Input({ required: true })
  public events!: Observable<{
    category: ICategory;
    onCreated: (category: ICategory) => undefined;
    onDeleted: (category: ICategory) => undefined;
  }>;

  private service: CategoryService = inject(CategoryService);
  protected addCreatedCategory = (category: ICategory) => void 0;
  protected addDeletedCategory = (category: ICategory) => void 0;
  protected category: ICategory = {} as ICategory;
  protected open = false;

  private cleanErrors() {
    this.nombre.control.setErrors(null);
    this.descripcion.control.setErrors(null);
  }

  private cleanEditor() {
    if (!this.category.id) {
      this.category = {} as ICategory;
      this.descripcion.control.reset();
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
    if (!this.nombre.valid || this.nombre.value === '') {
      this.nombre.control.setErrors({ required: true });
      return;
    }

    if (!this.descripcion.valid || this.descripcion.value === '') {
      this.descripcion.control.setErrors({ required: true });
      return;
    }

    this.category.nombre = this.nombre.value;
    this.category.descripcion = this.descripcion.value;

    if (this.category.id) {
      this.service
        .update(this.category)
        .subscribe({
          next: () => {
            this.closeEditor();
            this.cleanEditor();
          },
          error: (error) => console.error(error),
        });
    }
    else {
      this.service
        .create(this.category)
        .subscribe({
          next: (category) => {
            this.addCreatedCategory(category);
            this.closeEditor();
            this.cleanEditor();
          },
          error: (error) => console.error(error),
        });
    }
  }

  protected async delete() {
    if (!this.category.id) {
      return;
    }

    this.service
      .delete(this.category)
      .subscribe({
        next: () => {
          this.addDeletedCategory(this.category);
          this.closeEditor();
          this.cleanEditor();
        },
        error: (error) => console.error(error),
      });
  }

  public ngOnInit() {
    this.events.subscribe({
      next: (event) => {
        this.addCreatedCategory = event.onCreated;
        this.addDeletedCategory = event.onDeleted;
        this.category = event.category;

        this.descripcion.control.setValue(this.category.descripcion);
        this.nombre.control.setValue(this.category.nombre);
        this.open = true;
      },
    });
  }
}
