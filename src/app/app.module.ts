import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimatedCustomizableTextComponent } from './shared/animated-customizable-text/animated-customizable-text.component';
import { SplitIntoCharsPipe } from './core/pipes/split-into-chars.pipe';
import { SplitIntoWordsPipe } from './core/pipes/split-words.pipe';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { JwtService } from './core/services/jwt.service';
import { UserService } from './core/services/user.service';
import { EMPTY } from 'rxjs';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CursorContainerComponent } from './shared/cursor/cursor-container/cursor-container.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { AppRoutingModule } from './app-routing.module';

export function initAuth(jwtService: JwtService, userService: UserService) {
  return () => (jwtService.getToken() ? userService.getCurrentUser() : EMPTY);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    AppRoutingModule,

    AnimatedCustomizableTextComponent,
    SplitIntoCharsPipe,
    SplitIntoWordsPipe,
    MenuComponent,
    FooterComponent,
    CursorContainerComponent,
    HeaderComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [JwtService, UserService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
