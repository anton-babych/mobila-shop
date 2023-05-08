import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from '../../../features/basket/basket.service';
import { ResizeService } from '../../services/resize.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isBasketOpened: boolean = false;
  isMobile: boolean = false;
  basketCount: number = 0;
  subscriptions: Subscription[] = [];

  constructor(
    private resizeService: ResizeService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.basketService.count.subscribe((x) => (this.basketCount = x))
    );
    this.subscriptions.push(
      this.basketService.basketIsClicked.subscribe(
        (x) => (this.isBasketOpened = x)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  handleBasketClick() {
    this.basketService.setBasketClick(
      !this.basketService.basketIsClicked.value
    );
  }
}
