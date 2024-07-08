import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { EditorComponent } from '../../component/category/editor/editor.component';
import { CategoryComponent } from '../../component/category/category.component';
import { CategoryService } from '../../service/category.service';
import ICategory from '../../../types/ICategory';

@Component({
  imports: [CategoryComponent, EditorComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  selector: 'app-categories',
  standalone: true,
})
export class CategoriesComponent implements OnInit {
  private service: CategoryService = inject(CategoryService);
  protected categories: Array<ICategory> = [];
  protected offcanvas = new Subject<{
    delete: boolean;
    category: ICategory;
    onCreated: (category: ICategory) => undefined;
    onDeleted: (category: ICategory) => undefined;
  }>();

  private addCategory(category: ICategory) {
    this.categories.push(category);
    return void 0;
  }

  protected removeCategory(category: ICategory) {
    this.categories = this.categories
      .filter((c) => c.id !== category.id);
    return void 0;
  }

  protected clickAddCategory() {
    this.offcanvas.next({
      delete: false,
      category: {} as ICategory,
      onCreated: this.addCategory.bind(this),
      onDeleted: (category: ICategory) => void 0,
    });
  }

  public ngOnInit() {
    const category = {} as ICategory;
    this.service
      .obtain(category)
      .subscribe((data) => this.categories = data);
  }
}