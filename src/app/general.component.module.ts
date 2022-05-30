import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DdButtonComponent } from './components/dd-button/dd-button.component';
import { DdInputComponent } from './components/dd-input/dd-input.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [DdButtonComponent, DdInputComponent],
  exports: [DdButtonComponent, DdInputComponent],
})
export class GeneralModule {}