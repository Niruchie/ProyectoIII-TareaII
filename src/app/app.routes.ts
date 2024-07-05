import { Routes } from '@angular/router';

import { userGuard } from './guard/user.guard';
import { noneGuard } from './guard/none.guard';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/common/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/common/dashboard/dashboard.component';

export const routes: Routes = [
	{
		path: '',
		canActivate: [noneGuard],
		component: HomeComponent,
	},
	{
		path: 'register',
		canActivate: [noneGuard],
		component: RegisterComponent,
	},
	{
		path: 'login',
		canActivate: [noneGuard],
		component: LoginComponent,
	},
	{
		path: 'dashboard',
		canActivate: [userGuard],
		component: DashboardComponent,
	},
];
