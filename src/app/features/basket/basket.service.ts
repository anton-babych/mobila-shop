import { Injectable } from '@angular/core';
import {PhoneModel} from "../../core/models/phone.model";
import {BehaviorSubject} from "rxjs";
import {BasketModel} from "./basket.model";


export type BasketDictionary = Record<string, number>;

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  items: BehaviorSubject<BasketModel[]> = new BehaviorSubject<BasketModel[]>([]);
  count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  basketIsClicked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  add(item: PhoneModel) {
    const currentItems = this.items.value;

    let find = currentItems.find(x => x.id === item.id);
    if(find) {
      find.count += 1
    }
    else{
      currentItems.push({id: item.id, name: item.name, image_url: item.image_url, count: 1, price: item.price});
    }

    this.items.next(currentItems);

    this.updateCount();
    this.setBasketClick(true);
  }

  delete(itemId: string){
    this.items.next(this.items.value.filter(item => item.id !== itemId));

    this.updateCount();
  }

  setBasketClick(isBasketOpened: boolean) {
    this.basketIsClicked.next(isBasketOpened);
  }

  private updateCount() {
    this.count.next(this.getCount());
  }

  private getCount() : number{
    return this.items.value.length
  }

  has(id: string) : boolean {
    return !!this.items.value.find(x => x.id === id);
  }
}
