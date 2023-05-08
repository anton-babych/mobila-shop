import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ShopCategory } from '../../core/utils/shopCategory';
import { PhoneService } from '../../core/services/phone.service';
import { AccessoryService } from '../../core/services/accessory.service';
import { BasicProductModel } from '../../core/models/basic-product.model';
import { PhoneModel } from '../../core/models/phone.model';
import { AccessoryModel } from '../../core/models/accessory.model';

enum ActionType {
  'Create' = 'Створити',
  'Edit' = 'Редагувати',
}

@Component({
  selector: 'app-adminPanel',
  template: `
    <div class="fullscreen flex flex-center flex-vertical">
      <div class="admin-container">
        <div class="tabs-container sm-mb" *ngIf="actionTypeKeys.length">
          <div
            class="tab cursor flex flex-center tab__{{
              currentActionKey === key ? 'active' : 'default'
            }}"
            *ngFor="let key of actionTypeKeys"
            (click)="onSelectedAction(key)"
          >
            {{ key }}
          </div>
        </div>

        <ng-container [ngSwitch]="currentActionKey">
          <ng-container *ngSwitchCase="ActionType.Create">
            <div class="tabs-container sm-mb" *ngIf="shopCategoryValues.length">
              <div
                class="tab cursor flex flex-center tab__{{
                  currentCategory === category ? 'active' : 'default'
                }}"
                *ngFor="let category of shopCategoryValues"
                (click)="onSelectedCategory(category, true)"
              >
                {{ category }}
              </div>
            </div>

            <div class="form-container padding-top">
              <admin-form-container
                *ngIf="emptyItem && currentCategory; else noSelectedItem"
                [item]="emptyItem"
                [category]="currentCategory"
              ></admin-form-container>
            </div>
          </ng-container>

          <ng-container *ngSwitchCase="ActionType.Edit">
            <div class="tabs-container sm-mb" *ngIf="shopCategoryValues.length">
              <div
                class="tab cursor flex flex-center tab__{{
                  currentCategory === key ? 'active' : 'default'
                }}"
                *ngFor="let key of shopCategoryValues"
                (click)="onSelectedCategory(key)"
              >
                {{ key }}
              </div>
            </div>

            <div class="tabs-container sm-mb" *ngIf="itemsByKey.length">
              <div
                class="tab cursor flex flex-center tab__{{
                  currentItem === item ? 'active' : 'default'
                }}"
                *ngFor="let item of itemsByKey"
                (click)="onSelectedItem(item)"
              >
                {{ item.name }}
              </div>
            </div>

            <div class="form-container padding-top">
              <admin-form-container
                *ngIf="currentItem && currentCategory; else noSelectedItem"
                [item]="currentItem"
                [category]="currentCategory"
              ></admin-form-container>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </div>

    <ng-template #noSelectedItem></ng-template>
  `,
  styles: [
    `
      .admin-container {
        padding: 5vh 10vw;
        min-width: 50vw;
      }

      .tabs-container {
        display: flex;
        width: 100%;
        min-height: 4rem;
        flex-wrap: wrap;
      }

      .tab {
        flex: 1;
        display: flex;
        justify-content: center;
        place-items: center;

        background-color: white;

        font-size: 1.6rem;
        padding: 2rem 0.5rem;
        text-align: center;

        cursor: pointer;

        transition: all 0.5s;

        &__active {
          color: black;
          border: 1px black solid;
          font-weight: 500;
        }

        &__default {
          color: darkgray;
          border: 1px darkgray solid;
        }
      }

      .padding-top {
        padding-top: 4rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  readonly ActionType = ActionType;
  readonly actionTypeKeys: string[] = Object.values(ActionType);
  readonly ShopCategory = ShopCategory;
  readonly shopCategoryValues = Object.values(ShopCategory);

  itemsByKey: BasicProductModel[] = [];
  currentItem!: BasicProductModel;
  currentCategory!: ShopCategory;
  currentActionKey!: ActionType;
  emptyItem!: BasicProductModel;

  constructor(
    private phoneService: PhoneService,
    private accessoryService: AccessoryService,
    private cd: ChangeDetectorRef
  ) {}

  onSelectedAction(key: string) {
    this.currentActionKey = key as ActionType;

    this.detectChanges();
  }

  onSelectedCategory(key: string, isEmpty: boolean = false) {
    this.currentCategory = key as ShopCategory;

    if (isEmpty) {
      switch (key) {
        case 'Телефони':
          this.emptyItem = {} as PhoneModel;
          break;
        case 'Чохли':
          this.emptyItem = {} as AccessoryModel;
          break;
        default:
          throw new Error('not implemented category');
      }
    } else {
      console.log('on selected key', this.currentCategory, key);
      this.updateItemsByKey(key as ShopCategory);
    }

    this.detectChanges();
  }

  onSelectedItem(item: BasicProductModel) {
    console.log('on selected item', this.currentItem, item);
    this.currentItem = item;

    this.detectChanges();
  }

  private updateItemsByKey(key: ShopCategory) {
    switch (key) {
      case 'Телефони':
        this.phoneService.read().subscribe((x) => {
          this.setItems(x);
        });
        break;
      case 'Чохли':
        this.accessoryService.read().subscribe((x) => {
          this.setItems(x);
        });
        break;
      default:
        throw new Error('not implemented key here');
    }
  }

  private setItems(x: BasicProductModel[]) {
    this.itemsByKey = x;
  }
  private detectChanges() {
    this.cd.detectChanges();
  }
}
