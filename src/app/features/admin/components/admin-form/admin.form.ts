import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  Type,
} from '@angular/core';
import { BasicProductModel } from '../../../../core/models/basic-product.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface FormControlConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
}

@Component({
  selector: 'checking',
  template: ``,
})
export abstract class AdminForm<T extends BasicProductModel> {
  @Input() item!: T;
  @Output() itemEdited = new EventEmitter<T>();
  @Output() itemCreated = new EventEmitter<T>();
  @Output() itemDeleted = new EventEmitter<T>();

  formGroup!: FormGroup;
  newItem!: T;
  formControls: FormControlConfig[] = [];

  protected constructor(private formBuilder: FormBuilder) {}

  protected init() {
    this.newItem = this.item;

    this.formGroup = this.formBuilder.group({});
    this.formControls.forEach((control) => {
      this.formGroup.addControl(
        control.name,
        this.formBuilder.control(control.value, Validators.required)
      );
    });
  }
  handleSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    if (this.hasId()) {
      console.log('edited');
      this.formGroup.value.id = this.item.id;
      this.itemEdited.emit(this.formGroup.value);
    } else {
      console.log('created');
      this.formGroup.value.id = this.generateGUID();
      this.itemCreated.emit(this.formGroup.value);
    }
  }

  handleDelete() {
    this.formGroup.value.id = this.item.id;
    this.itemDeleted.emit(this.formGroup.value);
  }

  private generateGUID() {
    let u =
      Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
    return [
      u.substr(0, 8),
      u.substr(8, 4),
      '4000-8' + u.substr(13, 3),
      u.substr(16, 12),
    ].join('-');
  }

  private hasId() {
    return typeof this.item.id !== 'undefined';
  }
}
