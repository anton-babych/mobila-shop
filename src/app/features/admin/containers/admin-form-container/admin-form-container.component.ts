import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShopCategory } from '../../../../core/utils/shopCategory';
import { BasicProductModel } from '../../../../core/models/basic-product.model';
import { AccessoryModel } from '../../../../core/models/accessory.model';
import { PhoneModel } from '../../../../core/models/phone.model';

@Component({
  selector: 'admin-form-container',
  template: `
    <div class="form-container" [ngSwitch]="category">
      <div class="" *ngSwitchCase="'Телефони'">
        <phones-form [item]="getItemAsPhone()" (itemEdited)="onItemEdited($event)" (itemCreated)="onItemCreated($event)" (itemDeleted)="onItemDeleted($event)"></phones-form>
      </div>
      <div class="" *ngSwitchCase="'Чохли'">
        <case-form [item]="getItemAsAccessory()" (itemEdited)="onItemEdited($event)" (itemCreated)="onItemCreated($event)" (itemDeleted)="onItemDeleted($event)"></case-form>
      </div>
    </div>
  `,
  styleUrls: ['./admin-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFormContainerComponent implements OnChanges {
  @Input() item!: BasicProductModel;
  @Input() category!: ShopCategory;

  ngOnChanges(changes: SimpleChanges): void {
    let currentItem = changes['item']?.currentValue;
    let currentCategory = changes['category']?.currentValue;

    if (currentItem) this.item = currentItem;
    if (currentCategory) this.category = currentCategory;
  }

  onItemEdited(item: BasicProductModel) {}

  onItemCreated(item: BasicProductModel) {}

  onItemDeleted(item: BasicProductModel) {}

  getItemAsAccessory(): AccessoryModel {
    return this.item as AccessoryModel;
  }

  getItemAsPhone(): PhoneModel {
    return this.item as PhoneModel;
  }
}
