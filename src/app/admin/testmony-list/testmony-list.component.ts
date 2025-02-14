import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-testmony-list',
  templateUrl: './testmony-list.component.html',
  styleUrl: './testmony-list.component.css'
})
export class TestmonyListComponent {

  messages:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){

    this.allFeedback()
  }

allFeedback(){

  this.api.testmonialApi().subscribe((res:any)=>{
    console.log(res);
    this.messages=res
    
  })
}

updateStatus(id:string,status:string){
  this.api.updateTestmonialsApi(id,status).subscribe((res:any)=>{
    this.allFeedback()
  })

}

}
