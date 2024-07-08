import { Component, Input } from '@angular/core';
import ICategory from '../../../types/ICategory';
import { EditorComponent } from "./editor/editor.component";
import { Subject } from 'rxjs';

@Component({
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    selector: 'app-category',
    standalone: true,
    imports: [EditorComponent]
})
export class CategoryComponent {
  @Input({ required: true })
  public onDeleted!: (category: ICategory) => undefined;

  @Input({ required: true })
  public category!: ICategory;

  protected offcanvas: Subject<{
    delete: boolean;
    category: ICategory;
    onCreated: (category: ICategory) => undefined;
    onDeleted: (category: ICategory) => undefined;
  }> = new Subject();

  protected clickUpdateCategory() {
    this.offcanvas.next({
      delete: false,
      category: this.category,
      onDeleted: this.onDeleted,
      onCreated: (category: ICategory) => void 0,
    });
  }
}
