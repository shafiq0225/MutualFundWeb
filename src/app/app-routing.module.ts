import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './comps/nav/nav.component';
import { HomeComponent } from './comps/home/home.component';
import { NavManagementComponent } from './comps/nav-management/nav-management.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'navdetails', component: NavComponent },
  { path: 'navmgmt', component: NavManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
