import { Routes } from '@angular/router';

import { userGuard } from './guard/user.guard';
import { noneGuard } from './guard/none.guard';

import { HomeComponent } from './pages/common/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/common/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';

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
	{
		path: 'products',
		canActivate: [userGuard],
		component: ProductsComponent,
	},
	{
		path: 'categories',
		canActivate: [userGuard],
		component: CategoriesComponent,
	},
];
