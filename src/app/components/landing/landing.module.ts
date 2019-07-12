import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LandingComponent } from "./landing.component";
import { LoginComponent } from "../auth/login/login.component";
import { RegisterComponent } from "../auth/register/register.component";



const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  declarations: [LandingComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ], 
  entryComponents: [RegisterComponent, LoginComponent]
})
export class LandingModule { }
