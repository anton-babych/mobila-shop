import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { inject, NgModule } from '@angular/core';
import { UserService } from './core/services/user.service';
import { map } from 'rxjs';
import { ItemContainerComponent } from './features/item/item-container/item-container.component';
import { AdminComponent } from './features/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/main/shop-container/shop-container.component').then(
        (x) => x.ShopContainerComponent
      ),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./core/auth/auth.component').then((m) => m.AuthComponent),
    // canActivate: [
    //   () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    // ],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./core/auth/auth.component').then((m) => m.AuthComponent),
    // canActivate: [
    //   () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    // ],
  },
  {
    path: ':category/:id',
    loadComponent: () =>
      import('./features/item/item-container/item-container.component').then(
        (x) => x.ItemContainerComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin.component').then((x) => x.AdminComponent),
    // canActivate: [
    //   () => inject() if is logged as admin
    // ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
