import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'running-text',
  templateUrl: './running-text.component.html',
  styleUrls: ['./running-text.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf],
})
export class RunningTextComponent {
  @Input() isLeft: boolean = true;
  @Input() animationDuration: number = 20;
  @Input() fontSize: number = 1;
  @Input() text: string = 'check';
  @Input() count: number = 10;
}
