import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { ShopContainerComponent } from './features/main/shop-container/shop-container.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './features/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ShopGridComponent } from './features/main/shop-grid/shop-grid.component';
import { ShopItemComponent } from './features/main/shop-item/shop-item.component';
import { MouseMaskImageComponent } from './shared/mouse-mask-image/mouse-mask-image.component';
import { ItemContainerComponent } from './features/item/item-container/item-container.component';
import { RunningTextComponent } from './shared/running-text/running-text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasketContainerComponent } from './features/basket/containers/basket-container/basket-container.component';
import { BasketComponent } from './features/basket/components/basket/basket.component';
import { CursorContainerComponent } from './shared/cursor/cursor-container/cursor-container.component';
import { TextCursorComponent } from './shared/cursor/text-cursor/text-cursor.component';
import { AdminFormContainerComponent } from './features/admin/containers/admin-form-container/admin-form-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhonesFormComponent } from './features/admin/components/admin-form/phones-form/phones-form.component';

import { DropDownComponent } from './features/admin/components/drop-down/drop-down.component';
import { CaseFormComponent } from './features/admin/components/admin-form/case-form/case-form.component';
import { RecommendedItemComponent } from './features/item/recommended-item/recommended-item.component';
import { AnimatedCustomizableTextComponent } from './shared/animated-customizable-text/animated-customizable-text.component';
import { MenuBtnComponent } from './shared/buttons/menu-btn.component';
import { SplitIntoCharsPipe } from './core/pipes/split-into-chars.pipe';
import { SplitIntoWordsPipe } from './core/pipes/split-words.pipe';
import { MenuComponent } from './shared/menu/menu.component';

export const routes: Routes = [
  {
    path: '',
    component: ShopContainerComponent,
  },
  {
    path: ':category/:id',
    component: ItemContainerComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    ShopGridComponent,
    ShopItemComponent,
    ShopContainerComponent,
    MouseMaskImageComponent,
    ItemContainerComponent,
    RunningTextComponent,
    BasketContainerComponent,
    BasketComponent,
    CursorContainerComponent,
    TextCursorComponent,
    AdminFormContainerComponent,
    PhonesFormComponent,
    DropDownComponent,
    CaseFormComponent,
    RecommendedItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AnimatedCustomizableTextComponent,
    MenuBtnComponent,
    SplitIntoCharsPipe,
    SplitIntoWordsPipe,
    MenuComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
