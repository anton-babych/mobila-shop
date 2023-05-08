import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Subject, Subscription, takeUntil} from "rxjs";
import {CursorType} from "./CursorType";
import {CursorData} from "./CursorData";

@Injectable({
  providedIn: 'root'
})

export class CursorService {
  readonly cursorOpened: BehaviorSubject<CursorData> = new BehaviorSubject<CursorData>(
    {type:CursorType.Text, text:'чек'}
  );
  readonly cursorMoved: Subject<MouseEvent> = new Subject<MouseEvent>();
  readonly cursorClosed: Subject<void> = new Subject<void>();

  constructor() { }

  listen(element: HTMLElement, type: CursorType, cursorText: string) : Subscription[]{
    let subscriptions: Subscription[] = [];

    subscriptions.push(
      this.listenToEvent(element, 'mouseenter', ()=>{
        this.openCursor(type, cursorText);
      })
    );

    subscriptions.push(
      this.listenToEvent(element, 'mousemove',(mouseEvent:MouseEvent)=>{
        this.moveCursor(mouseEvent);
      })
    );

    subscriptions.push(
      this.listenToEvent(element, 'mouseleave', ()=>{
        this.closeCursor();
      })
    );

    return subscriptions;
  }

  private listenToEvent<T extends Event>(element: HTMLElement, event: string, callback: (event: T) => void): Subscription {
    return fromEvent<T>(element, event).subscribe((event: T) => {
      callback(event);
    });
  }

  private openCursor(type: CursorType, cursorText: string){
    this.cursorOpened.next({type: type, text: cursorText});
  }

  private closeCursor(){
    this.cursorClosed.next();
  }

  private moveCursor(event: MouseEvent) {
    this.cursorMoved.next(event);
  }
}
