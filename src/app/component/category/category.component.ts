import { Component, inject, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subject } from 'rxjs';

import { AuthenticationService } from '../../service/authentication.service';
import { EditorComponent } from "./editor/editor.component";
import ICategory from '../../../types/ICategory';
import RoleEnum from '../../../types/RoleEnum';

@Component({
    imports: [EditorComponent, NgIf],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    selector: 'app-category',
    standalone: true,
})
export class CategoryComponent {
  @Input({ required: true })
  public onDeleted!: (category: ICategory) => undefined;

  @Input({ required: true })
  public category!: ICategory;

  protected canModify = inject(AuthenticationService)
    .hasRole(RoleEnum.SUPER_ADMIN_ROLE);
  protected offcanvas: Subject<{
    category: ICategory;
    onCreated: (category: ICategory) => undefined;
    onDeleted: (category: ICategory) => undefined;
  }> = new Subject();

  protected clickUpdateCategory() {
    this.offcanvas.next({
      category: this.category,
      onDeleted: this.onDeleted,
      onCreated: (category: ICategory) => void 0,
    });
  }
}
