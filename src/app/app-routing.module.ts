import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './components/landing/landing.module#LandingModule' },  
  { path: 'login', loadChildren: './components/auth/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './components/auth/register/register.module#RegisterModule' },
  {
    path: 'dashboard',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'homes',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule', 
    canActivate: [AuthGuard]
  },
  { path: 'home', loadChildren: './authenticated/app-tabs/app-tabs.module#AppTabsPageModule'
    // canActivate: [AuthGuard]  
  },
  { path: 'profile', loadChildren: './authenticated/profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
