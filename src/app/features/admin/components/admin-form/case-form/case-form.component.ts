import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AdminForm, FormControlConfig } from '../admin.form';
import { AccessoryModel } from '../../../../../core/models/accessory.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'case-form',
  templateUrl: '../admin.form.html',
  styleUrls: ['../admin.form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseFormComponent
  extends AdminForm<AccessoryModel>
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
        name: 'image url',
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
      {
        name: 'phone id',
        label: 'Phone id',
        type: 'text',
        placeholder: 'id of phone',
        value: this.item.phoneId,
      },
      {
        name: 'phone model name',
        label: 'Model Name',
        type: 'text',
        placeholder: 'model of phone',
        value: this.item.modelName,
      },
    ];

    this.init();
  }
}
