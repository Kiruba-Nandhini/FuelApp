import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelPagePageRoutingModule } from './fuel-page-routing.module';

import { FuelPagePage } from './fuel-page.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    FuelPagePageRoutingModule,
  ],
  declarations: [FuelPagePage],
})
export class FuelPagePageModule {}
