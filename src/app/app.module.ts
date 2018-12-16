import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PhotoComponent } from './pages/photo/photo.component';

import { DomService } from './services/dom/dom.service';
import { ModalService } from './services/modal/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    FeedComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    DomService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
