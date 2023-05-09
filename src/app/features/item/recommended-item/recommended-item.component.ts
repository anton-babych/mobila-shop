import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-recommended-item',
  templateUrl: './recommended-item.component.html',
  styleUrls: ['./recommended-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class RecommendedItemComponent {}
