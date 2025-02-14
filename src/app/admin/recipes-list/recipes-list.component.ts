import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent {

  allRecipes:any=[]

  searchPip:string=''

  constructor(private api:ApiService){}


  ngOnInit(){
    this.getAllrecipies()
  }

  getAllrecipies(){
    this.api.getAllrecipeAPI().subscribe((res:any)=>{
      this.allRecipes=res

      console.log(res);
      

      console.log(this.allRecipes);
      
    })
  }

  deleteItem(id:string){
    this.api.deleteItemApi(id).subscribe((res:any)=>{
      this.getAllrecipies()
    })
  }

}
