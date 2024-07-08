import { Routes } from '@angular/router';

import { adminGuard } from './guard/admin.guard';
import { userGuard } from './guard/user.guard';
import { noneGuard } from './guard/none.guard';
import { anyGuard } from './guard/any.guard';

import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { DashboardComponent } from './pages/common/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/common/home/home.component';
import { UsersComponent } from './pages/users/users.component';

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
	{
		path: 'users',
		canActivate: [userGuard, adminGuard],
		component: UsersComponent,
	},
	{
		path: 'unauthorized',
		canActivate: [anyGuard],
		component: UnauthorizedComponent,
	},
];
