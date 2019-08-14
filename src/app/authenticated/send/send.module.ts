import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SendPage } from './send.page';

const routes: Routes = [
  {
    path: '',
    component: SendPage,
    children: [
      {
        path: 'credit',
        children: [
          {
            path: '',
            loadChildren: './authenticated/send/credit/credit.module#CreditPageModule'
          }
        ]
      },
      {
        path: 'debit',
        children: [
          {
            path: '',
            loadChildren: './authenticated/send/debit/debit.module#DebitPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'debit',
        pathMatch: 'full'
      }
    ]
  }
];
  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SendPage]
})
export class SendPageModule {}
