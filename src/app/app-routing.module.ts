import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardViewComponent } from './customers/card-view/card-view.component';
import { CustomersComponent } from './customers/customers.component';
import { ListViewComponent } from './customers/list-view/list-view.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VacationsComponent } from './vacations/vacations.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'vacations', component: VacationsComponent, canActivate: [AuthGuardService]},
  {path: 'vacations/:id', component: VacationsComponent, canActivate: [AuthGuardService] },
  
  {path: 'customers', component: CustomersComponent,
   children: [
    {path: 'card', component: CardViewComponent},
    {path: 'list', component: ListViewComponent},
    {path: 'create', component:RegisterComponent, canActivate: [RoleGuard], data: {expectedRole: '1'}}
  ], canActivate: [AuthGuardService]},

  {path: 'customers/create/:id', component:RegisterComponent, canActivate: [RoleGuard], data: {expectedRole: '1'}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
