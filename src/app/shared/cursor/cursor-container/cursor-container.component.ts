import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {CursorService} from "../cursor.service";
import {CursorType} from "../CursorType";
import {TextCursorComponent} from "../text-cursor/text-cursor.component";
import {skip, Subscription} from "rxjs";

@Component({
  selector: 'cursor-container',
  templateUrl: './cursor-container.component.html',
  styleUrls: ['./cursor-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursorContainerComponent implements OnDestroy, AfterViewInit{
  isCursorVisible: boolean = false;
  cursorType: CursorType = CursorType.Text;
  cursorText: string = 'перевірка';

  @ViewChild(TextCursorComponent) cursor!: TextCursorComponent;

  private destroySubscription!: Subscription;
  private closeTimeoutId!: number;

  constructor(private cursorService: CursorService,
              private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.initCursorEvents();
  }

  ngOnDestroy(): void {
  }

  private initCursorEvents() {
    this.cursorService.cursorOpened.pipe(skip(1)).subscribe((value) => {
      this.onOpened(value.type, value.text);
    });

    this.cursorService.cursorMoved.subscribe((e) => {
      this.onMove(e);
    });

    this.cursorService.cursorClosed.subscribe(() => {
      this.onClosed();
    });
  }

  private onOpened(type: CursorType, text: string) {
    this.stopClosing();

    this.cursorType = type;
    this.isCursorVisible = true;
    this.cursorText = text;

    this.detectChanges();
  }

  private onMove(event: MouseEvent) {
    this.cursor?.move(event);
  }

  private onClosed() {
    this.destroySubscription?.unsubscribe();

    this.closeTimeoutId = setTimeout(()=>{
      this.destroySubscription = this.cursor.beforeDestroy().subscribe(()=>{
        this.isCursorVisible = false;
        this.detectChanges();
      })
    },50)
  }

  private detectChanges() {
    this.cd.detectChanges();
  }

  private stopClosing() {
    clearTimeout(this.closeTimeoutId);
  }
}
