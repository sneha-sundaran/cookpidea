import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadlistComponent } from './downloadlist/downloadlist.component';
import { UserListComponent } from './user-list/user-list.component';
import { TestmonyListComponent } from './testmony-list/testmony-list.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ManageRecipesComponent } from './manage-recipes/manage-recipes.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,title:'Admin Dashboard'},
  {path:'download-list',component:DownloadlistComponent,title:'Recipes Dwonload List'},
  {path:'user-list',component:UserListComponent,title:'User List'},
  {path:'testimomy-list',component:TestmonyListComponent,title:'Testimony  List'},
  {path:'recipes-list',component:RecipesListComponent,title:'Testimony  List'},
  {path:'Recipe-add',component:ManageRecipesComponent,title:'Recipes Dwonload List'},
  {path:'recipe/edit/:id',component:ManageRecipesComponent,title:'edit recipes'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
