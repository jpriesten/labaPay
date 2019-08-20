import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DebitPage } from './debit.page';
import { ProcessDebitPage } from './process-debit/process-debit.page';

const routes: Routes = [
  {
    path: '',
    component: DebitPage,
    children: [
      {
        path: 'process_debit',
        children: [
          {
            path: '',
            loadChildren: './process-debit/process-debit.module#ProcessDebitPageModule'
          }
        ]
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
  declarations: [DebitPage, ProcessDebitPage],
  entryComponents: [ProcessDebitPage]
})
export class DebitPageModule {}
