import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { NgForOf } from '@angular/common';
import { SplitIntoCharsPipe } from '../../core/pipes/split-into-chars.pipe';

@Component({
  selector: 'animated-customizable-text',
  template: `
    <div
      #container
      class="text-container"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave()"
    >
      <span class="char" *ngFor="let char of text | splitIntoChars">{{ char }}</span>
    </div>
  `,
  styles: [
    `
      .text-container {
        display: inline-block;
      }

      .char {
        pointer-events: none;
        font-family: 'Flexible', sans-serif;
        font-size: 20rem;

        font-variation-settings: 'HGHT' 1000, 'wdth' 100;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, SplitIntoCharsPipe],
})
export class AnimatedCustomizableTextComponent implements AfterViewInit {
  @Input() text: string = 'default';
  @Input() fontSizeExpression!: string;
  @Input() fontColor!: 'white';
  @Input() rangeValue: number = 2;

  @ViewChild('container') containerRef!: ElementRef;

  private charElements!: NodeListOf<HTMLElement>;

  ngAfterViewInit(): void {
    this.charElements = this.containerRef.nativeElement.querySelectorAll(
      '.char'
    ) as NodeListOf<HTMLElement>;

    this.initFontSettings();
  }

  onMouseMove(event: MouseEvent) {
    const divWidth = this.containerRef.nativeElement.clientWidth;
    const offsetX = event.offsetX;
    const relativeX = Math.floor((offsetX / divWidth) * 1000);

    this.charElements.forEach((charElement: HTMLElement) => {
      const relativeCharX = this.getRelativeX(charElement);
      let value = Math.abs(relativeX - relativeCharX) * this.rangeValue;

      this.animateCharVariantSetting(value, 1000 - value, charElement, 600);
    });
  }

  onMouseLeave() {
    this.charElements.forEach((charElement: HTMLElement) => {
      this.animateCharVariantSetting(1000, 100, charElement, 200);
    });
  }

  private animateCharVariantSetting(
    height: number,
    width: number,
    charElement: HTMLElement,
    duration: number
  ) {
    const keyframes = {
      fontVariationSettings: this.formatFontVariantSettings(height, width),
    };

    charElement.animate(keyframes, {
      duration: duration,
      fill: 'forwards',
    });
  }

  private initFontSettings() {
    this.charElements.forEach((char) => {
      char.style.fontSize = this.fontSizeExpression ?? '20rem';
      char.style.color = this.fontColor;
    });
  }

  private formatFontVariantSettings(height: number, width: number): string {
    return `'HGHT' ${height}, 'wdth' ${width}`;
  }

  private getRelativeX(charElement: HTMLElement) {
    const elementRect = charElement.getBoundingClientRect();
    const elementPosition = elementRect.left + elementRect.width / 2;
    const containerRect = this.containerRef.nativeElement.getBoundingClientRect();
    return ((elementPosition - containerRect.left) / containerRect.width) * 1000;
  }
}
