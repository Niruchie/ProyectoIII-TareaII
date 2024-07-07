import { Component, Input } from '@angular/core';
import ICategory from '../../../types/ICategory';

@Component({
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  selector: 'app-category',
  standalone: true,
})
export class CategoryComponent {
  @Input() 
  category: ICategory = {} as ICategory;
}
