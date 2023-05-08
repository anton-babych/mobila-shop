import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, fromEvent, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResizeService{
  readonly resizeSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkIfMobile();
    this.setupResizeListener();
  }

  checkIfMobile() {
    this.resizeSubject$.next(this.isMobile());
  }

  isMobile(){
    return window.innerWidth < 768;
  }

  setupResizeListener() {
    fromEvent(window, 'resize')
      .subscribe(() => {
        this.checkIfMobile();
      });
  }

}
