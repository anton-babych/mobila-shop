import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mouse-mask-image',
  templateUrl: './mouse-mask-image.component.html',
  styleUrls: ['./mouse-mask-image.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseMaskImageComponent implements OnInit {
  @Input() imageUrl!: string;

  ngOnInit(): void {
    const container = document.getElementById('image-container');
    const image = document.getElementById('image');

    if (!image || !container) return;

    function getMouseCoordinates(e: MouseEvent, offsetLeft: number, offsetTop: number) {
      const x = e.pageX - offsetLeft;
      const y = e.pageY - offsetTop;
      return { x, y };
    }

    container.addEventListener('mouseenter', function (e) {
      const { x, y } = getMouseCoordinates(e, this.offsetLeft, this.offsetTop);
      image.style.clipPath = 'circle(20% at ' + x + 'px ' + y + 'px)';
    });

    container.addEventListener('mousemove', function (e) {
      const { x, y } = getMouseCoordinates(e, this.offsetLeft, this.offsetTop);
      image.style.clipPath = 'circle(20% at ' + x + 'px ' + y + 'px)';
    });

    container.addEventListener('mouseleave', function (e) {
      const { x, y } = getMouseCoordinates(e, this.offsetLeft, this.offsetTop);
      image.style.clipPath = 'circle(0 at ' + x + 'px ' + y + 'px)';
    });
  }
}
