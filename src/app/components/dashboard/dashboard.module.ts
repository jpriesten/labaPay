import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { DashboardComponent } from "./dashboard.component";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent
    }])
  ]
})
export class DashboardModule { }
