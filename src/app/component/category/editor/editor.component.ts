import { Component, Input, ViewChild } from '@angular/core';
import ICategory from '../../../../types/ICategory';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { CategoryService } from '../../../service/category.service';
import { Observable } from 'rxjs';

@Component({
  imports: [EditorComponent, CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  selector: 'app-category-editor',
  standalone: true,
})
export class EditorComponent {
  @Input()
  events!: Observable<{
    category: ICategory;
    onCreated: (category: ICategory) => undefined;
    onUpdated: (category: ICategory) => undefined;
  }>;

  @ViewChild('nombre')
  nombre!: NgModel;

  @ViewChild('descripcion')
  descripcion!: NgModel;

  constructor(private service: CategoryService) {
    
  }

  ngOnInit() {
    this.events.subscribe({
      next: (event) => {
        this.addUpdatedCategory = event.onUpdated;
        this.addCreatedCategory = event.onCreated;
        this.category = event.category;
        this.open = true;
      },
    });
  }

  protected open = false;
  protected category: ICategory = {} as ICategory;
  protected addCreatedCategory = (category: ICategory) => void 0;
  protected addUpdatedCategory = (category: ICategory) => void 0;

  protected cleanEditor() {
    this.nombre.control.reset();
    this.descripcion.control.reset();
  }

  protected closeEditor() {
    this.cleanEditor();
    this.open = false;
    return this.open;
  }

  async save() {
    if (!this.nombre.valid || this.nombre.value === '') {
      this.nombre.control.markAsTouched();
      return;
    }

    if (!this.descripcion.valid || this.descripcion.value === '') {
      this.descripcion.control.markAsTouched();
      return;
    }

    this.category.nombre = this.nombre.value;
    this.category.descripcion = this.descripcion.value;

    if (this.category.id) {
      this.service
        .update(this.category)
        .subscribe({
          next: () => {
            this.addUpdatedCategory(this.category);
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
}
