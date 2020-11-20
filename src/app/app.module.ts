import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import { FeatherModule } from 'angular-feather';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomersComponent } from './customers/customers.component';
import { VacationsComponent } from './vacations/vacations.component';
import { CardViewComponent } from './customers/card-view/card-view.component';
import { CardComponent } from './customers/card-view/card/card.component';
import { ListViewComponent } from './customers/list-view/list-view.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortableColumnComponent } from './sortable-column/sortable-column.component';

import { Camera, Heart, Github, Edit, ExternalLink, Grid, List, Plus, Users } from 'angular-feather/icons';
import { VacationRequestComponent } from './vacation-request/vacation-request.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './services/sort.directive';
import { RoleGuard } from './guards/role.guard';

const icons = {
  Camera, Heart, Github, Edit, ExternalLink, Grid, List, Plus, Users
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomersComponent,
    VacationsComponent,
    CardViewComponent,
    CardComponent,
    ListViewComponent,
    LoginComponent,
    RegisterComponent,
    SortableColumnComponent,
    VacationRequestComponent,
    NgbdSortableHeader,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FeatherModule.pick(icons),
    NgbModule
  ],
  exports:[
    FeatherModule
  ],
  providers: [AuthGuardService, DecimalPipe, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
