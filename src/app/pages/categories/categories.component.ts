import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { NgIf } from '@angular/common';

import { EditorComponent } from '../../component/category/editor/editor.component';
import { CategoryComponent } from '../../component/category/category.component';
import { AuthenticationService } from '../../service/authentication.service';
import { ReportingService } from '../../service/reporting.service';
import { CategoryService } from '../../service/category.service';
import ICategory from '../../../types/ICategory';
import RoleEnum from '../../../types/RoleEnum';

@Component({
  imports: [CategoryComponent, EditorComponent, NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  selector: 'app-categories',
  standalone: true,
})
export class CategoriesComponent implements OnInit {
  private service: CategoryService = inject(CategoryService);
  private reporter = inject(ReportingService);
  protected categories: Array<ICategory> = [];
  protected canAggregate = inject(AuthenticationService)
    .hasRole(RoleEnum.SUPER_ADMIN_ROLE);
  protected offcanvas = new Subject<{
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
      category: {} as ICategory,
      onCreated: this.addCategory.bind(this),
      onDeleted: (category: ICategory) => void 0,
    });
  }

  public ngOnInit() {
    const category = {} as ICategory;
    this.service
      .obtain(category)
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.reporter
            .info("Categorías cargadas correctamente.");
        },
        error: (error) => this.reporter.error("Error al cargar las categorías."),
      });
  }
}