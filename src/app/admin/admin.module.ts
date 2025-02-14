import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadlistComponent } from './downloadlist/downloadlist.component';
import { UserListComponent } from './user-list/user-list.component';
import { TestmonyListComponent } from './testmony-list/testmony-list.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ManageRecipesComponent } from './manage-recipes/manage-recipes.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    DashboardComponent,
    DownloadlistComponent,
    UserListComponent,
    TestmonyListComponent,
    RecipesListComponent,
    ManageRecipesComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SearchPipe,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HighchartsChartModule
  

  ]
})

export class AdminModule { }
