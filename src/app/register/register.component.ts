import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {  Router } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
  // styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  registerForm:FormGroup

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
    this.registerForm=this.fb.group({

        username:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
            email:["",[Validators.required,Validators.email]],
            password:["",[Validators.required,Validators.pattern("[a-zA-Z0-9 ]*")]]
    })

  }
  
register(){
  if(this.registerForm.valid){
    //api call
    const username=this.registerForm.value.username
    const email=this.registerForm.value.email
    const password=this.registerForm.value.password

    console.log(username,email,password);
    this.api.addUserApi({username,email,password}).subscribe({
      next:(res:any)=>{
        alert(`welcome ${res.username}`)
        this.router.navigateByUrl('/login')
        this.registerForm.reset()
      },
      error:(reason:any)=>{
        alert(reason.error)
        this.registerForm.reset()
      }
    })
    

  }
  else{
    alert('invalid form')
  }
}
}
