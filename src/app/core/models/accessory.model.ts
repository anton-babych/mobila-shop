import {BasicProductModel} from "./basic-product.model";

export interface AccessoryModel extends BasicProductModel{
  modelName: string;
  phoneId: string,
}
