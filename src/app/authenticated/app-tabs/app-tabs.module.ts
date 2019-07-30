import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppTabsPage } from './app-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AppTabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      {
        path: 'sends',
        loadChildren: '../send/send.module#SendPageModule'
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule'
      },
      {
        path: '',
        redirectTo: 'sends',
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
  declarations: [AppTabsPage]
})
export class AppTabsPageModule {}
