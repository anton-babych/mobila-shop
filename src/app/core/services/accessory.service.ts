import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccessoryModel } from '../models/accessory.model';
import { ShopCategory } from '../utils/shopCategory';

@Injectable({
  providedIn: 'root',
})
export class AccessoryService {
  private readonly category: ShopCategory = ShopCategory.Cases;
  private testAccessoryData: AccessoryModel[] = [
    {
      category: this.category,
      id: 'case-1',
      phoneId: '2',
      name: 'ESR Project Zero Case Clear',
      price: 200,
      modelName: 'IPhone 13',
      image_url:
        'https://ilounge.ua/files/products/esr-project-zero-case-iphone-1300000.1000x.jpg',
      description:
        'Прозорий силіконовий чохол ESR Project Zero Case захистить ваш новий iPhone від подряпин, ударів, падінь і збереже презентабельний вигляд смартфона.',
    },
    {
      category: this.category,
      id: 'case-2',
      phoneId: '2',
      name: 'oneLounge 1Mag Bumper MagSafe',
      price: 499,
      modelName: 'IPhone 13',
      image_url:
        'https://ilounge.ua/files/products/onelounge-1mag-iphone-12-case.1000x.jpg',
      description:
        'Прозорий чохол oneLounge 1Mag Bumper MagSafe для iPhone 13 — хороший аксесуар для вашого iPhone, з яким ви без проблем зможете використовувати зарядку MagSafe і при цьому ваш смартфон буде захищений від подряпин і пошкоджень.',
    },
    {
      category: this.category,
      id: 'case-3',
      phoneId: '2',
      name: 'Casexy UltraXy Nothing',
      price: 450,
      modelName: 'IPhone SE',
      image_url:
        'https://ilounge.ua/files/products/casexy-ultraxy-nothing-iphone-8-7-se3-se200010.1000x.webp',
      description:
        'Подаруйте собі приємні емоції, обравши принтований чохол Casexy. Наші найсексуальніші чохли з яскравим дизайном виготовлені з високоякісних пластику і силікону, тому їм не страшні падіння та інші пошкодження.',
    },
    {
      category: this.category,
      id: 'case-4',
      phoneId: '2',
      name: 'oneLounge 5Mag MagSafe',
      price: 646,
      modelName: 'IPhone 14',
      image_url:
        'https://ilounge.ua/files/products/onelounge-1mag-bumper-magsafe-iphone-14-pro-max-02.1000x1000.webp',
      description:
        'прозрачный чехол высокого качества с поддержкой MagSafe, он поможет вам предотвратить царапины и повреждения на вашем iPhone.',
    },
    {
      category: this.category,
      id: 'case-5',
      phoneId: '2',
      name: 'Casexy UltraXy UA It s a good trip',
      price: 120,
      modelName: 'IPhone 7',
      image_url:
        'https://ilounge.ua/files/products/casexy-ultraxy-ua-its-a-good-trip-iphone-xs00006.600x600.webp',
      description:
        'Подаруйте собі приємні емоції, обравши принтований чохол Casexy. Наші найсексуальніші чохли з яскравим дизайном виготовлені з високоякісних пластику і силікону, тому їм не страшні падіння та інші пошкодження.',
    },
    {
      category: this.category,
      id: 'case-6',
      phoneId: '2',
      name: 'oneLounge 1Thin 0.6mm MagSafe Black',
      price: 50,
      modelName: 'IPhone 14 Pro',
      image_url:
        'https://ilounge.ua/files/products/onelounge-1thin-06mm-magsafe-black-iphone-14-pro-3.1000x.webp',
      description:
        'Тут йде надтонкий корпус із приємною на дотик текстурою поверхні. Товщина аксесуара становить 0.6 мм, але водночас конструкція чохла є досить міцною. Він ідеально сідає на iPhone 14 Pro і має точні вирізи для кнопок, порту для заряджання та динаміка.',
    },
    {
      category: this.category,
      id: 'case-8',
      phoneId: '2',
      name: 'Casexy UltraXy UA SLOVO BLACK MagSafe',
      price: 513,
      modelName: 'IPhone 14',
      image_url:
        'https://ilounge.ua/files/products/slovo-black-iphone-13-14-14-plus_4.600x600.webp',
      description:
        'Будьте впевнені, що з часом цей принт не зітреться від постійного контакту з дрібними речами, такими як ключі, ручки тощо. Ми протестували його на міцність і вибрали найкращі матеріали й фарби для забезпечення максимальної яскравості та насиченості. Щоб отримати таку якість, ми використали багатошарове лазерне нанесення, поверхневе закріплення фарби й декоративні вставки з прозорого гелю.',
    },
  ];

  readAllByItemId(id: string): Observable<AccessoryModel[]> {
    let accessories = this.testAccessoryData.filter((x) => x.phoneId === id);
    return of(accessories);
  }

  readById(id: string): Observable<AccessoryModel> {
    const accessory = this.testAccessoryData.find((x) => x.id === id);
    if (!accessory) throw new Error(`Accessory with id "${id}" not found`);

    return of(accessory);
  }

  read() {
    return of(this.testAccessoryData);
  }

  readByModelName(modelName: string): Observable<AccessoryModel[]> {
    const accessory = this.testAccessoryData.filter((x) => x.modelName === modelName);

    if (!accessory) throw new Error(`Accessory with modelName "${modelName}" not found`);

    return of(accessory);
  }

  readByPhoneName(phoneName: string): Observable<AccessoryModel[]> {
    const accessory = this.testAccessoryData.filter((x) =>
      phoneName.includes(x.modelName)
    );

    if (!accessory) throw new Error(`Accessory with phone name "${phoneName}" not found`);

    return of(accessory);
  }
}
