import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipes',
  templateUrl: './manage-recipes.component.html',
  styleUrl: './manage-recipes.component.css'
})
export class ManageRecipesComponent {

  @Input() id!:string

  cusineArray:any=[]
  allMeals:any=[]
  ingredients:any=[]

  instructions:any=[]

  recipeDeails:RecipeModel={}

  MealArray:any=[]

constructor(private api:ApiService,private router:Router){}
ngOnInit(){
  this.getAllRecipes()

}


  
  getAllRecipes(){
    this.api.getAllrecipeAPI().subscribe((res:any)=>{
     

      if(this.id){
        this.recipeDeails=res.find((item:any)=>item._id==this.id)


        this.ingredients=this.recipeDeails.ingredients
        this.instructions=this.recipeDeails.instructions
        this.MealArray=this.recipeDeails.mealType
      }
  
      //get cuisine type
      res.forEach((item:any)=>{
     !this.cusineArray.includes(item.cuisine) &&
     this.cusineArray.push(item.cuisine)
     console.log(this.cusineArray);
     
      })

      //get meal type

     const mealArrays= res.map((item:any)=>item.mealType)
     const flatMeal=mealArrays.flat(Infinity)
     console.log(flatMeal);
     
     flatMeal.forEach((item:any)=>{
      !this.allMeals.includes(item) &&
      this.allMeals.push(item)

      console.log(this.allMeals);
      
     
      
       })

      
    })
  }


  addIngredients(ingredientInput:any){
    if(ingredientInput.value){
      this.ingredients.push(ingredientInput.value)
      ingredientInput.value=''
      console.log(this.ingredients);
      
    }

  }


  removeIngredent(value:any){
  this.ingredients =  this.ingredients.filter((item:any)=>item!=value)
  }


  addInstructions(insteuctionInput:any){
    if(insteuctionInput.value){
      this.instructions.push(insteuctionInput.value)
      insteuctionInput.value=''
      console.log(this.instructions);
      
    }

  }

  removeInstruction(value:any){
    this.instructions =  this.instructions.filter((item:any)=>item!=value)
    }



    mealTypeSelect(event:any){


      if(event.target.checked){
       !this.MealArray.includes(event.target.name) && this.MealArray.push(event.target.name)
      }
      else{
        this.MealArray=this.MealArray.filter((item:string)=>item!=event.target.name)
      }
      console.log(this.MealArray);
      




      
    }
    removeMealArray(meal:string){
      this.MealArray=this.MealArray.filter((item:any)=>item!=meal)
    }


    addRecipes(){
    
 

      console.log(this.recipeDeails);

      this.recipeDeails.ingredients=this.ingredients
      this.recipeDeails.instructions=this.instructions

      this.recipeDeails.mealType=this.MealArray

      const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=this.recipeDeails
      console.log(this.recipeDeails);

      if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0 ){

        //api call
        console.log('doo api call');
        console.log(this.recipeDeails);
        
        this.api.addRecipesAPI(this.recipeDeails).subscribe({
          next:(res:any)=>{
            alert('recipes added suucessfullyy')
            this.recipeDeails={}
            this.ingredients=[]
            this.instructions=[]
            this.MealArray=[]
            this.router.navigateByUrl('/admin/recipes-list')
          },
          error:(reson:any)=>{
            alert(reson.console.error)
            this.recipeDeails.name=''
            
          }
        })

      }
      else{
        alert('fill the form completely')
      }
    }

    editRecipes(){
    
 

      console.log(this.recipeDeails);

      this.recipeDeails.ingredients=this.ingredients
      this.recipeDeails.instructions=this.instructions

      this.recipeDeails.mealType=this.MealArray

      const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=this.recipeDeails
      console.log(this.recipeDeails);

      if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0 ){

     this.api.updateRecipesAPI(this.id,this.recipeDeails).subscribe((res:any)=>{
      alert('recipes updated successfully')
      this.recipeDeails={}
      this.ingredients=[]
      this.MealArray=[]
      this.instructions=[]
      this.router.navigateByUrl('/admin/recipes-list')
    
     })
    

      }
      else{
        alert('fill the form completely')
      }
    }


}
