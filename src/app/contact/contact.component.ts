import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  testimonyForms:FormGroup


  constructor(private fb:FormBuilder,private api:ApiService){
    this.testimonyForms=this.fb.group({
      name:['',[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      email:['',[Validators.required,Validators.email]],
      message:['',[Validators.required,Validators.pattern("[a-zA-Z0-9 ]*")]]
    })


  }
  handleTestmoniy(){
    if(this.testimonyForms.valid){
      //api call

      const name=this.testimonyForms.value.name
      const email=this.testimonyForms.value.email
      const message=this.testimonyForms.value.message
      console.log(name,email,message);
      
      this.api.addTestmonials({name,email,message}).subscribe((res:any)=>{
        alert('thank you for youre valuable thought')
        this.testimonyForms.reset()
      })

    }
    else{
      alert('invalid form')
    }
  }

}
