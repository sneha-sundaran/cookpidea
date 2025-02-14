import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PnfComponent } from './pnf/pnf.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { SaveRecipesComponent } from './save-recipes/save-recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

//lazy loading path in top of the function
{path:'admin', canActivate:[authGuard],loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},


    {path:"", component:HomeComponent,title:"home"},
    {path:'about',component:AboutComponent,title:'about'},
    {path:"contact", component:ContactComponent,title:'contact'},
    {path:"login", component:LoginComponent,title:'login'},
    {path:'register',component:RegisterComponent,title:'register'},
    {path:'recipes',component:RecipesComponent,title:'Recipes'},
    {path:'recipes/view/:id', canActivate:[authGuard],component:ViewRecipesComponent,title:'View Recipes'},
    {path:"save/recipes" , canActivate:[authGuard],component:SaveRecipesComponent,title:"saver recipes"},
    {path:"profile" , canActivate:[authGuard],component:ProfileComponent,title:"profile "},
    {path:'**',component:PnfComponent,title:'page not found'}
  
];
