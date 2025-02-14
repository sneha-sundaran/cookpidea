import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent {

  recipeId:string=''
  recipe:any={}
  allRelatedRecipes:any=[]

constructor(private api:ApiService,private route:ActivatedRoute){}

ngOnInit(){
  this.route.params.subscribe((res:any)=>{
    console.log(res);
    this.recipeId=res.id
  this.getRecipeDetails(this.recipeId)
  
    
  })
}

getRecipeDetails(recipeId:string){
  this.api.viewRecipeAPI(recipeId).subscribe((res:any)=>{
    // this.recipe=res
    console.log(res);
    this.recipe=res
    this.getAllRelatedRecipes(res.cuisine)
    console.log(this.recipe);
    
  
    

  
  })


}

getAllRelatedRecipes(cuisine:string){
  this.api.relaedRecipesAPI(cuisine).subscribe((res:any)=>{
    console.log(res);

    if(res.length>1){
      this.allRelatedRecipes=res.filter((item:any)=>item.name!=this.recipe.name)
      console.log(this.allRelatedRecipes);
      
    }
    else{
      this.allRelatedRecipes=[]
    }
 

    
  })
} 
 downloadRecipe(){
  this.api.downloadRecipesApi(this.recipeId,this.recipe).subscribe((res:any)=>{
    this.api.getChatdata()
    this.generatePdf()
  })
}


  generatePdf(){

    const pdf=new jsPDF()

    pdf.setFontSize(16)
    pdf.setTextColor('red')
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(10)
    pdf.setTextColor('black')
    pdf.text( `Cusine:${this.recipe.cuisine}`,10,10)
    pdf.text( `service:${this.recipe.Servings}`,10,30)
    pdf.text( `Mode of cooking:${this.recipe.difficulty}`,10,30)//replce with key from data
    pdf.text( `Total preparation time:${this.recipe.service}`,10,35)
    pdf.text( `Total Cooking time:${this.recipe.cookTimeMinutes}`,10,40)
    pdf.text( `Total calories per serving :${this.recipe.caloriesPerServing}`,10,45)




    let head=[['ingredients needed ' ,'cooking instruction']]
    let body=[]
    body.push([this.recipe.ingredients,this.recipe.instruction])
    autoTable(pdf,{head,body,startY:50})
    pdf.output(`dataurlnewwindow`)
    pdf.save('download-recipe.pdf')
  }

saveRcepi(){
  this.api.saveRecipesApi(this.recipeId,this.recipe).subscribe({
    next:(res:any)=>{
      alert('recis add succesfuly')
    },error:(reason:any)=>{
      alert(reason.error)
    }
  })
}

}
