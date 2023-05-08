import { Injectable } from '@angular/core';
import { PhoneModel } from '../models/phone.model';
import { of } from 'rxjs';
import { ShopCategory } from '../utils/shopCategory';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private readonly category: ShopCategory = ShopCategory.Phones;

  private data: PhoneModel[] = [
    {
      category: this.category,
      id: '1',
      name: 'IPhone 13',
      description:
        'У гарячий Apple iPhone 13 закохуєшся з першого погляду. Елегантні риси корпусу, нові кольори, дивовижний дисплей, камери, які можуть позмагатися з найкращою фототехнікою, потужні процесори та швидкісна операційна система. Це вже давно не просто смартфони, а витвори високотехнологічного мистецтва.',
      price: 200000,
      image_url:
        'https://ilounge.ua/files/products/apple-iphone-13-blue-01_1.600x600.jpg',
    },
    {
      category: this.category,
      id: '2',
      name: 'IPhone SE',
      description:
        'Компанія Apple щороку дивує фанатів і користувачів потужними смартфонами. Весна 2020 також принесла гарячу новинку, про яку давно шумів інтернет - свіженький iPhone SE другого покоління. Айфон СЕ 2 отримав зовнішність улюбленої 8-ки, і начинку флагманського iPhone 11 Pro.',
      price: 19400,
      image_url: 'https://ilounge.ua/files/products/apple-iphone-se-3-1_1.1000x.jpg',
    },
    {
      category: this.category,
      id: '3',
      name: 'IPhone 14 Plus',
      description:
        'iPhone 14 Plus - абсолютно новий базовий смартфон Apple, що прийшов на заміну iPhone 13 mini восени 2022 року. Версія Плюс отримала низку помітних змін і вагомих доповнень: квадратні плоскі грані, діагональне розташування основних камер, традиційний виріз-чубчик і діагональ 6,7 дюйма. Крім того, розробники наділили новинку потужним акумулятором, що дозволяє працювати до 26 годин від одного заряду.',
      price: 200000,
      image_url:
        'https://ilounge.ua/files/products/apple-iphone-14-128-gb-kupit_1.600x600.webp',
    },
    {
      category: this.category,
      id: '4',
      name: 'IPhone 12 256gb Red',
      description:
        'iPhone 12 обладнаний LCD IPS дисплеєм з діагоналлю 6.1 дюйма (15,5 см), на відміну від моделей Pro, які мають OLED-дисплеї. Роздільна здатність становить 1792 × 828 пікселів, щільність пікселів дисплея становить 326 ppi (Liquid Retina), максимальна яскравість 625 ніт та контрастністю 1400:1.',
      price: 200000,
      image_url:
        'https://media.bite.lt/@bite-lv/sites/default/files/products/2021-04/iphone_12_purple-3.png',
    },
  ];

  constructor() {}

  read() {
    return of(this.data);
  }

  readById(id: string) {
    let phone = this.data.find((x) => x.id === id);
    return of(phone);
  }
}
