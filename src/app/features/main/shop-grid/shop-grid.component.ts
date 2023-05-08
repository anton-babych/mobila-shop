import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasicProductModel } from '../../../core/models/basic-product.model';

@Component({
  selector: 'shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopGridComponent {
  @Input() items!: BasicProductModel[];
}
