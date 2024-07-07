import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import IProduct from '../../../types/IProduct';

@Component({
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  selector: 'app-product',
  standalone: true,
})
export class ProductComponent {
  @Input() 
  product!: IProduct;
}
