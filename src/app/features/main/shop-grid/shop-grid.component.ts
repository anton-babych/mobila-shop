import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasicProductModel } from '../../../core/models/basic-product.model';
import { NgForOf } from '@angular/common';
import { ShopItemComponent } from '../shop-item/shop-item.component';

@Component({
  selector: 'shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, ShopItemComponent],
  standalone: true,
})
export class ShopGridComponent {
  @Input() items!: BasicProductModel[];
}
