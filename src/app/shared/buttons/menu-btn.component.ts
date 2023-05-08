import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'menu-btn',
  template: `
    <div class="btn-container" (click)="handleClick()" [routerLink]="link">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .btn-container {
        background-color: black;
        width: fit-content;
        height: fit-content;
        padding: 2rem 5rem;
        border: grey 1px solid;
        border-radius: 0.5rem;
        transition: border 0.5s linear;

        cursor: pointer;

        &:hover {
          border: darkorange 1px solid;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
})
export class MenuBtnComponent implements OnDestroy {
  @Input() link!: string;
  handleClick() {}

  ngOnDestroy(): void {}
}
