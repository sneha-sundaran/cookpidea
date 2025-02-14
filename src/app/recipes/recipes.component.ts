import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import {FormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination'
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,SearchPipe,FormsModule,NgxPaginationModule] ,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  //get cheyunna data store cheyuth vekkan use cheyunnu
  allRecipies:any=[]
  cusineArray:any=[]
  allMeals:any=[]
  dummyAllRecipes:any=[]
  searchKey:string=""
  P:number=1


  constructor(private api:ApiService,private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllrecipeAPI().subscribe((res:any)=>{
      this.allRecipies=res
      this.dummyAllRecipes=res
      console.log(this.allRecipies);
      //get cuisine type
      this.allRecipies.forEach((item:any)=>{
     !this.cusineArray.includes(item.cuisine) &&
     this.cusineArray.push(item.cuisine)
     console.log(this.cusineArray);
     
      })

      //get meal type

     const mealArrays= this.allRecipies.map((item:any)=>item.mealType)
     const flatMeal=mealArrays.flat(Infinity)
     console.log(flatMeal);
     
     flatMeal.forEach((item:any)=>{
      !this.allMeals.includes(item) &&
      this.allMeals.push(item)

      console.log(this.allMeals);
      
     
      
       })

      
    })
  }

  //arguments ayiit key and values Key String
  filterAllRecipes(key:string,value:string){
  this.allRecipies= this.dummyAllRecipes.filter((item:any)=>item[key].includes(value))


  }

  viewRecipe(recipeId:string){
    if(sessionStorage.getItem('token'))
    {
      this.router.navigateByUrl(`/recipes/view/${recipeId}`)
    }
    else{
      alert(' please login to get full access to our recipes')
    }
    

  }
}
