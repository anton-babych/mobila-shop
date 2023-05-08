import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {BasketModel} from "../../basket.model";
import {gsap} from "gsap";
import {delay, Observable} from "rxjs";

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements AfterViewInit{
  @Input() basketsData!: BasketModel[];
  @Input() totalPrice!: number;
  @Input() beforeDestroy!: Observable<void>;

  @Output() needsToRecalculateTotalPrice = new EventEmitter();
  @Output() needsToDeleteItem = new EventEmitter<string>();

  ngAfterViewInit(): void {
    this.animateIn();
  }

  private animateIn() {
    let tl = gsap.timeline()

    tl.from('.basket-container', {
      x: "100%"})

    if(this.basketsData.length){
      tl.from(".basket-item", {
          stagger: .3,
          x: "100%",
      });
    }
  }

  animateOut() : Promise<void>{
    return new Promise<void>((resolve, reject) => {
      try {
        gsap.to('.basket-container', 0.5, {
          y: "-100%",
          onComplete: ()=> {
            resolve();
          }
        });
      }catch (e){
        reject(new Error('gsap not working here'));
      }
    })
  }

  increaseCountFor(basket: BasketModel) {
    basket.count += 1;

    this.needsToRecalculateTotalPrice.emit();
  }

  decreaseCountFor(basket: BasketModel) {
    basket.count -= 1;

    this.needsToRecalculateTotalPrice.emit()
  }

  handleDeleteItem(basketId: string) {
    this.needsToDeleteItem.emit(basketId);
  }
}
