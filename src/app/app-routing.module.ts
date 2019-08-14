import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'send',
    pathMatch: 'full'
  },
  
  { path: 'landing', loadChildren: './components/landing/landing.module#LandingModule' },  
  { path: 'login', loadChildren: './components/auth/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './components/auth/register/register.module#RegisterModule' },

  // Guarded routes
  {
    path: 'profile',
    loadChildren: './authenticated/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'send',
    loadChildren: './authenticated/send/send.module#SendPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: './authenticated/settings/settings.module#SettingsPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'cards', 
    children: [
      {
        path: '',
        loadChildren: './authenticated/settings/cards/cards.module#CardsPageModule'
      },
      {
        path: 'new',
        loadChildren: './authenticated/settings/cards/new-card/new-card.module#NewCardPageModule',
      },
      {
        path: 'detail',
        loadChildren: './authenticated/settings/cards/card-detail/card-detail.module#CardDetailPageModule'
      }
    ],
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: 'send', pathMatch: 'full' },
  { path: 'edit-profile', loadChildren: './authenticated/profile/edit-profile/edit-profile.module#EditProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
