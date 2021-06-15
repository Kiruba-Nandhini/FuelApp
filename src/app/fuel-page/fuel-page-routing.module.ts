import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelPagePage } from './fuel-page.page';

const routes: Routes = [
  {
    path: '',
    component: FuelPagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelPagePageRoutingModule {}
