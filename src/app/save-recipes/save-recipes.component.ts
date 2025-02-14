import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-save-recipes',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './save-recipes.component.html',
  styleUrl: './save-recipes.component.css'
})
export class SaveRecipesComponent {

  allRecipes:any=[]
  constructor(private api:ApiService){}



  ngOnInit(){
    this.getAllSavedRecipes()
  }
   getAllSavedRecipes(){
    this.api.getAllSavedRecipes().subscribe((res:any)=>{
      this.allRecipes=res
    })
  }
  removesavedRecipes(id:string){
    this.api.deleteSavedRecipedAPI(id).subscribe((res:any)=>{
      this.getAllSavedRecipes()
    })
 
  }

}
