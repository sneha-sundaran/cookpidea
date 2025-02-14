import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { json } from 'express';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileImg:string='https://st2.depositphotos.com/19428878/44134/v/450/depositphotos_441346602-stock-illustration-default-avatar-profile-icon-vector.jpg'

  allRecipes:any=[]
  constructor(private api:ApiService){}



  ngOnInit(event:any){

    
    this.getUserRecipes()
    const user=JSON.parse(sessionStorage.getItem('user')|| "")
    if(user.profile){
      this.profileImg=user.profile
    }


  }

  getFile(event:any){

    let uploadFile=event.target.files[0]
 
    const fr=new FileReader()

    fr.readAsDataURL(uploadFile)
    fr.onload=(event:any)=>{
     
     this.profileImg=event.target.result  
                                
    }


 }

 updateProfile(){

  this.api.editUserProfileApi({profile:this.profileImg}).subscribe((res:any)=>{
    sessionStorage.setItem('user',JSON.stringify(res))
    this.profileImg=res.profile
    alert('profile updated successfully')
  })

 }


 getUserRecipes(){
  this.api.getuserDownloadRecipeAPI().subscribe((res:any)=>{
    console.log(res);

   this.allRecipes=res
    
  })
 }

}
