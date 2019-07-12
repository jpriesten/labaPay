import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ]
})
export class LoginModule { }
