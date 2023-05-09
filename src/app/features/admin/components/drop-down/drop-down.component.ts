import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BasicProductModel } from '../../../../core/models/basic-product.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'drop-down',
  template: `
    <div class="dropdown bg-border">
      <button class="dropbtn ">{{ getNameOrOption(selectedOption) }}</button>
      <div class="dropdown-content bg-border-right bg-border-left bg-border-top">
        <ng-content></ng-content>
        <a
          class="cursor bg-border-bottom"
          (click)="onSelectionChange(option)"
          *ngFor="let option of options"
          >{{ getNameOrOption(option) }}
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .dropbtn {
        background-color: white;
        padding: 16px;
        font-size: 16px;
        border: none;
        cursor: pointer;
      }

      .dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
      }

      .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
      }

      .dropdown-content a:hover {
        background-color: #f1f1f1;
      }

      .dropdown:hover .dropdown-content {
        display: block;
      }

      .dropdown:hover .dropbtn {
        background-color: white;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf],
})
export class DropDownComponent<T> implements OnInit, OnChanges {
  @Input() options!: T[];
  @Output() itemSelected: EventEmitter<T> = new EventEmitter<T>();

  selectedOption!: T;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedOption = this.options[0];
  }

  ngOnInit(): void {
    this.selectedOption = this.options[0];
  }

  onSelectionChange(item: T) {
    this.selectedOption = item;
    this.itemSelected.emit(this.selectedOption);

    this.cd.detectChanges();
  }

  getNameOrOption(option: T) {
    return (option as BasicProductModel).name ?? option;
  }
}
