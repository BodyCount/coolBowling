import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { GameSummaryComponent } from './components/game-summary/game-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
