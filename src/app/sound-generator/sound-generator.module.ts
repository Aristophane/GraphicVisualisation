import { MusicalRoseComponent } from './../musical-rose/musical-rose.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MusicalRoseComponent
  ],
  exports: [MusicalRoseComponent],
  imports: [
    CommonModule
  ]
})
export class SoundGeneratorModule { }
