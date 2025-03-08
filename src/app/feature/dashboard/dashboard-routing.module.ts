import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';

export const ROUTES_DASHBOARD: Routes = [{

  path: '',
  component: DashboardHomeComponent
}];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
