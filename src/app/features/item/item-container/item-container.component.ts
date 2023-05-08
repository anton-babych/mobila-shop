import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneService } from '../../../core/services/phone.service';
import { PhoneModel } from '../../../core/models/phone.model';
import { BasketService } from '../../basket/basket.service';
import { Subscription } from 'rxjs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AccessoryService } from '../../../core/services/accessory.service';
import { AccessoryModel } from '../../../core/models/accessory.model';
import { ShopCategory } from '../../../core/utils/shopCategory';

@Component({
  selector: 'app-item-container',
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemContainerComponent implements OnInit, OnDestroy, AfterViewInit {
  item!: PhoneModel;
  isAdded: boolean = false;
  triggerId: string = 'item-page';
  accessoriesData: AccessoryModel[] = [];
  category!: ShopCategory;

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef, private phoneService: PhoneService, private accessoriesService: AccessoryService, private basketService: BasketService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this.category = params.get('category') as ShopCategory;

        if (!id) return;
        switch (this.category) {
          case 'Телефони':
            this.phoneService.readById(id).subscribe((x) => {
              if (!x) return;
              this.item = x;
              this.subscriptions.push(
                this.accessoriesService.readByPhoneName(x.name).subscribe((p) => {
                  this.accessoriesData = p;
                  console.log(p, x.name);
                })
              );
              this.pushChanges();
            });
            break;
          case 'Чохли':
            this.accessoriesService.readById(id).subscribe((x) => {
              if (!x) return;
              this.item = x;
              this.pushChanges();
            });
            break;
          default:
            throw new Error('not implemented category');
        }
      })
    );

    window.scrollTo(0, 0);

    this.subscriptions.push(
      this.basketService.items.subscribe((x) => {
        this.isAdded = this.basketService.has(this.item.id);
        this.pushChanges();
      })
    );
  }

  handleClick() {
    if (this.isAdded) return;

    this.basketService.add(this.item);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateInfo();
      this.animateDescription();
    }, 1);
  }

  private animateDescription() {
    const textDiv = document.querySelector('.description');
    const textEl = document.querySelector('.description__text');
    const words = document.querySelectorAll('.description__word');

    gsap.to('.circle-parent', {
      scale: 5,
      y: (textDiv?.clientHeight ?? 0) / 2,
      scrollTrigger: {
        trigger: textDiv,
        start: '0% 70%',
        end: '80% 70%',
        scrub: 1,
        id: this.triggerId,
        //markers: true
      },
    });

    gsap.fromTo(
      textEl,
      {
        transformOrigin: '0% 50%',
        rotate: 3,
      },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: textEl,
          start: '-15% 50%',
          end: '50% 50%',
          scrub: true,
          id: this.triggerId,
          //markers: true
        },
      }
    );

    gsap.fromTo(
      words,
      {
        'will-change': 'opacity',
        opacity: 0.1,
      },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: textEl,
          start: '0% 45%',
          end: '95% 50%',
          scrub: true,
          id: this.triggerId,
          //markers: true
        },
      }
    );
  }

  private animateInfo() {
    const info = document.querySelector('.page-info');
    if (!info) return;
    const chars = info.querySelectorAll('.char');

    ScrollTrigger.create({
      trigger: '.item-title',
      start: '-20% 100%',
      end: '120% 100%',
      scrub: true,
      id: this.triggerId,
    });

    gsap.fromTo(
      chars,
      {
        'will-change': 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%',
      },
      {
        duration: 1,
        ease: 'back.inOut(2)',
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: 0.03,
        scrollTrigger: {
          trigger: '.item-title',
          start: '-20% 100%',
          end: '120% 100%',
          id: this.triggerId,
          toggleActions: 'play none none none',
        },
      }
    );

    const otherItem = document.querySelectorAll('.other-item');

    if (!otherItem) return;

    gsap.from(otherItem, {
      duration: 1,
      ease: 'back.inOut(2)',
      yPercent: -100,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.other-grid',
        start: '0% 90%',
        end: '100% 90%',
        id: this.triggerId,
        toggleActions: 'play none none none',
      },
    });
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach((x) => x.kill());
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  private pushChanges() {
    this.cd.detectChanges();
  }

  handleForwardClick() {}
}
