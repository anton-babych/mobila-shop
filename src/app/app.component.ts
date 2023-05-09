import { Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ResizeService } from './core/services/resize.service';

@Component({
  selector: 'app-root',
  template: `
    <layout-header></layout-header>
    <cursor-container *ngIf="!isMobile"></cursor-container>
    <div class="wrapper">
      <router-outlet></router-outlet>
    </div>
    <layout-footer></layout-footer>
  `,
  styles: [
    `
      .wrapper {
        padding-top: 4rem;
        background-color: white;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  isMobile: boolean = false;
  constructor(private resizeService: ResizeService) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    this.resizeService.resizeSubject$.subscribe((x) => (this.isMobile = x));
  }
}
