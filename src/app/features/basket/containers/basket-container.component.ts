import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BasketService } from '../basket.service';
import { BasketModel } from '../basket.model';
import { skip, Subscription } from 'rxjs';
import { BasketComponent } from '../components/basket/basket.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'basket-container',
  template: `
    <basket
      *ngIf="isVisible"
      [basketsData]="basketsData"
      [totalPrice]="totalPrice"
      (needsToDeleteItem)="onItemDelete($event)"
      (needsToRecalculateTotalPrice)="onCalculateTotalPrice()"
    ></basket>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BasketComponent, NgIf],
})
export class BasketContainerComponent implements OnInit, OnDestroy {
  @ViewChild(BasketComponent) basketComponent!: BasketComponent;

  basketsData: BasketModel[] = [];
  totalPrice: number = 0;
  isVisible: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.basketService.basketIsClicked.pipe(skip(1)).subscribe((e) => {
        if (e) this.isVisible = e;
        else {
          this.basketComponent.animateOut().then((x) => {
            this.isVisible = e;
          });
        }
      })
    );

    this.subscriptions.push(
      this.basketService.items.subscribe((e) => {
        this.basketsData = e;

        this.calculateTotalPrice();
      })
    );
  }

  private calculateTotalPrice() {
    this.totalPrice = this.basketsData.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  onItemDelete(id: string) {
    this.deleteItem(id);
  }

  onCalculateTotalPrice() {
    this.calculateTotalPrice();
  }

  deleteItem(basketId: string) {
    this.basketService.delete(basketId);
  }
}
