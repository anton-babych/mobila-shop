import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ResizeService } from '../../../core/services/resize.service';
import { Subscription } from 'rxjs';
import { PhoneModel } from '../../../core/models/phone.model';
import { PhoneService } from '../../../core/services/phone.service';
import { AccessoryModel } from '../../../core/models/accessory.model';
import { AccessoryService } from '../../../core/services/accessory.service';
import { ShopCategory } from '../../../core/utils/shopCategory';

@Component({
  selector: 'shop-container',
  templateUrl: './shop-container.component.html',
  styleUrls: ['./shop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopContainerComponent implements OnInit, OnDestroy {
  data: PhoneModel[] | AccessoryModel[] = [];
  isMobile = false;
  pickedCategory: ShopCategory = ShopCategory.Phones;
  models: string[] = [];
  pickedModel: string = '';
  readonly ShopCategory = ShopCategory;
  readonly categoryValues = Object.values(ShopCategory);
  private subscriptions: Subscription[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private resizeService: ResizeService,
    private phoneService: PhoneService,
    private accessoryService: AccessoryService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    this.getDataByCategory();

    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.subscriptions.push(
      this.resizeService.resizeSubject$.subscribe(
        (isMobile) => (this.isMobile = isMobile)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  handleCategoryChange(category: string) {
    this.pickedCategory = category as ShopCategory;

    this.getDataByCategory();
  }

  handleModelChange(model: string) {
    this.pickedModel = model;

    this.getDataByModel();
  }

  private getDataByCategory() {
    switch (this.pickedCategory) {
      case 'Телефони':
        this.getPhonesData();
        break;
      case 'Чохли':
        this.getAccessoryData();
        break;

      default:
        throw new Error('not implemented ' + this.pickedCategory);
    }
  }

  private getPhonesData() {
    this.subscriptions.push(this.phoneService.read().subscribe((x) => (this.data = x)));
  }

  private getAccessoryData() {
    this.subscriptions.push(
      this.accessoryService.read().subscribe((x) => {
        if (!x.length) return;

        x.forEach((accessory) => {
          const model = accessory.modelName;
          if (!this.models.includes(model)) {
            this.models.push(model);
          }
        });

        this.pickedModel = this.models[0];

        this.getDataByModel();
      })
    );
  }

  private getDataByModel() {
    this.subscriptions.push(
      this.accessoryService.readByModelName(this.pickedModel).subscribe((x) => {
        this.data = x;
        console.log(x, this.pickedModel);
      })
    );
  }

  private pushChanges() {
    this.cd.detectChanges();
  }
}
