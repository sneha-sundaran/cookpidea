import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes:any=[]

  feedbacklist:any=[]
constructor(private api:ApiService){}

ngOnInit(){
  this.getAllRecipes()
  this.getFeedbackList()
}

  //Api call

   getAllRecipes(){
    this.api.getAllrecipeAPI().subscribe((res:any)=>{
      this.allRecipes=res.slice(0,6)
      console.log( this.allRecipes);
      
    })
  
  }
  
  getFeedbackList(){
    this.api.feedbackapi().subscribe((res:any)=>{
      console.log(res);

      this.feedbacklist=res
      
    })
  }

}
