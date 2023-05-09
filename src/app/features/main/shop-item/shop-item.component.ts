import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BasicProductModel } from '../../../core/models/basic-product.model';
import { CursorService } from '../../../shared/cursor/cursor.service';
import { CursorType } from '../../../shared/cursor/CursorType';
import { IHaveCursor } from '../../../shared/cursor/IHaveCursor';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ShopCategory } from '../../../core/utils/shopCategory';

@Component({
  selector: 'shop-container-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  standalone: true,
})
export class ShopItemComponent implements OnInit, OnDestroy, IHaveCursor {
  @Input() item!: BasicProductModel;
  itemContainer!: HTMLElement;

  private subscriptions: Subscription[] = [];

  constructor(private element: ElementRef, private cursorService: CursorService) {}
  ngOnInit(): void {
    this.itemContainer = this.element.nativeElement.querySelector('.item-container');
    this.listenToCursorService();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  listenToCursorService(): void {
    let subs = this.cursorService.listen(
      this.itemContainer,
      CursorType.Text,
      `лише за ${this.item.price}грн`
    );
    subs.forEach((x) => this.subscriptions.push(x));
  }
}
