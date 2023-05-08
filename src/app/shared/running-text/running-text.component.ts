import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CursorService } from '../cursor/cursor.service';
import { CursorType } from '../cursor/CursorType';

@Component({
  selector: 'running-text',
  templateUrl: './running-text.component.html',
  styleUrls: ['./running-text.component.scss'],
})
export class RunningTextComponent {
  @Input() isLeft: boolean = true;
  @Input() animationDuration: number = 20;
  @Input() fontSize: number = 1;
  @Input() text: string = 'check';
  @Input() count: number = 10;
}
