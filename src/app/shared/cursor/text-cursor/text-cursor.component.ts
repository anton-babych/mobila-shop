import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { Observable } from 'rxjs';

@Component({
  selector: 'text-cursor',
  templateUrl: './text-cursor.component.html',
  styleUrls: ['./text-cursor.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextCursorComponent implements AfterViewInit, OnDestroy {
  private follower!: HTMLElement;

  @Input() text!: string;

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    this.follower = this.element.nativeElement.querySelector('.cursor-follower');
    if (!this.follower) throw new Error('no follower in text-cursor');

    gsap.from(this.follower, { scale: 0, ease: 'back.inOut(2)', duration: 0.25 });
  }

  beforeDestroy(): Observable<void> {
    return new Observable<void>((observer) => {
      gsap.to(this.follower, {
        scale: 0,
        duration: 0.25,
        ease: 'back.inOut(2)',
        onComplete: () => observer.next(),
      });
    });
  }

  ngOnDestroy(): void {}

  move(event: MouseEvent) {
    this.follower.style.top = event.clientY + 'px';
    this.follower.style.left = event.clientX + 'px';
  }
}
