import { MusicalRoseComponent } from './musical-rose/musical-rose.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicalRoseTahitiComponent } from './musical-rose-tahiti/musical-rose-tahiti.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicalRoseComponent,
    MusicalRoseTahitiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
