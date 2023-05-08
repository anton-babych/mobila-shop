import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AdminForm, FormControlConfig } from '../admin.form';
import { PhoneModel } from '../../../../../core/models/phone.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'phones-form',
  templateUrl: '../admin.form.html',
  styleUrls: ['../admin.form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhonesFormComponent
  extends AdminForm<PhoneModel>
  implements OnInit, OnChanges
{
  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  ngOnInit(): void {
    this.fillForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fillForm();
  }

  private fillForm() {
    this.formControls = [
      {
        name: 'id',
        label: 'ID',
        type: 'text',
        placeholder: 'id of phone',
        value: this.item.id,
      },
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'name of phone',
        value: this.item.name,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'description of phone',
        value: this.item.description,
      },
      {
        name: 'image_url',
        label: 'Image URL',
        type: 'text',
        placeholder: 'image url of phone',
        value: this.item.image_url,
      },
      {
        name: 'price',
        label: 'Price',
        type: 'number',
        placeholder: 'price of phone',
        value: this.item.price,
      },
    ];

    this.init();
  }
}
