import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ProfileGuard } from './guard/profile.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },

  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },

  { path: 'main', canActivate: [AuthGuard], loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule), },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'profile/:id', canActivate: [ProfileGuard], runGuardsAndResolvers: 'always', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },

  { path: 'role', loadChildren: () => import('./pages/role/role.module').then(m => m.RoleModule) },
  { path: 'community', loadChildren: () => import('./pages/community/community.module').then(m => m.CommunityModule) },

  { path: '**', loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
