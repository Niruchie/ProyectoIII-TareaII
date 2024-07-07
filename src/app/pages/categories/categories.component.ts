import { Component } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { CategoryComponent } from '../../component/category/category.component';
import { CategoryService } from '../../service/category.service';
import ICategory from '../../../types/ICategory';
import { EditorComponent } from '../../component/category/editor/editor.component';

@Component({
  imports: [CategoryComponent, EditorComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  selector: 'app-categories',
  standalone: true,
})
export class CategoriesComponent {
  protected categories: Array<ICategory> = [];
  protected offcanvas = new Subject<{
    category: ICategory;
    onCreated: (category: ICategory) => undefined;
    onUpdated: (category: ICategory) => undefined;
  }>();

  constructor(private service: CategoryService) {
    
  }

  ngOnInit() {
    const category = {} as ICategory;
    this.service
      .obtain(category)
      .subscribe((data) => this.categories = data);
  }

  private addCategory(category: ICategory) {
    this.categories.push(category);
    return void 0;
  }

  protected clickAddCategory() {
    this.offcanvas.next({
      category: {} as ICategory,
      onCreated: this.addCategory.bind(this),
      onUpdated: (category: ICategory) => void 0,
    });
  }
}