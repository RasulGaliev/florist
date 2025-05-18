import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'subscribe', component: SubscriptionFormComponent },
    { path: 'catalog', component: ProductListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];