import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { RegisterComponent } from "./register.component";

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent
      }
    ])
  ]
})
export class RegisterModule { }
