import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'

import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MessageComponent } from './message/message.component';
import { MessageIdComponent } from './message-id/message-id.component';
import { MessageTagComponent } from './message-tag/message-tag.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    MessageIdComponent,
    MessageTagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(
      [
        {path:'', component: HomeComponent},
        {path:'message', component: MessageComponent},
        {path:'message_id', component: MessageIdComponent},
        {path:'message_tag', component: MessageTagComponent}
      ]
    ),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
