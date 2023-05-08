import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBtnComponent } from '../buttons/menu-btn.component';
import { AnimatedCustomizableTextComponent } from '../animated-customizable-text/animated-customizable-text.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuBtnComponent, AnimatedCustomizableTextComponent],
  template: `
    <div class="menu">
      <div class="menu__links">
        <menu-btn *ngFor="let data of linkData" [link]="data.link">
          <animated-customizable-text
            [text]="data.title"
            [fontSizeExpression]="'clamp(10rem, 10vw, 30rem)'"
            [fontColor]="'white'"
          ></animated-customizable-text>
        </menu-btn>
      </div>
    </div>
  `,
  styles: [
    `
      .menu {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;

        width: 100vw;
        height: 100vh;
        background-color: black;

        &__links {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-wrap: wrap;
          justify-content: center;
          place-items: center;
        }

        &__link {
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, OnDestroy {
  readonly linkData: { title: string; link: string }[] = [
    { title: 'main', link: '/admin' },
    { title: 'about', link: '' },
    { title: 'more', link: '' },
  ];
  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
