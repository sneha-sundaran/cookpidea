import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url:String='https://recipesserver-n6i8.onrender.com/'

  constructor(private http:HttpClient) { }

  getAllrecipeAPI(){
    return  this.http.get(`${this.server_url}/getrecipes`)
  }

  addTestmonials(reqBody:any){

    return this.http.post(`${this.server_url}/postMessage`,reqBody)
    
  }

  
  addUserApi(reqBody:any){

    return this.http.post(`${this.server_url}/AddUser`,reqBody)
    
  }
  loginAPI(reqBody:any){

    return this.http.post(`${this.server_url}/loginUser`,reqBody)
    
  }

  addToken(){
    let headers=new HttpHeaders
    const token=sessionStorage.getItem('token')
    if(token){
      headers=headers.append('Authorization',`Bearer ${token}`)
    }
    return{headers}
  }
  viewRecipeAPI(recipeId:string){
    return  this.http.get(`${this.server_url}/recipes/view/${recipeId}`,this.addToken())

  }

  relaedRecipesAPI(cuisine:string){
    return  this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.addToken())

  }
  downloadRecipesApi(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/download/${recipeId}`,reqBody,this.addToken())
  }


  saveRecipesApi(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/save-recipe/${recipeId}`,reqBody,this.addToken())
  }
  getAllSavedRecipes(){
    return this.http.get(`${this.server_url}/get-save-recipes`,this.addToken())
  }

  deleteSavedRecipedAPI(recipeId:string){
    return this.http.delete(`${this.server_url}/savedrecipesremove/${recipeId}`,this.addToken())
  }


  editUserProfileApi(rebBody:any){
    return this.http.post(`${this.server_url}/edit-profile/`,rebBody,this.addToken())


  }

  getuserDownloadRecipeAPI(){

    return this.http.get(`${this.server_url}/get-download-recipes`,this.addToken())

  }

  getAllusersAPI(){

    return this.http.get(`${this.server_url}/get-users`,this.addToken())

  }

  downloadListAPI(){

    return this.http.get(`${this.server_url}/downloadList`,this.addToken())

  }


  testmonialApi(){

    return this.http.get(`${this.server_url}/alltestimonials`,this.addToken())

  }

  updateTestmonialsApi(feedbackId:string,status:string){

    return this.http.get(`${this.server_url}/testimonialUpdate/${feedbackId}?status=${status}`,this.addToken())

  }

  feedbackapi(){


    return this.http.get(`${this.server_url}/get-approverd`)

  }


  addRecipesAPI(reqBody:any){


    return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.addToken())

  }

  updateRecipesAPI(id:string,reqBody:any){


    return this.http.put(`${this.server_url}/update-recipe/${id}`,reqBody,this.addToken())

  }


  deleteItemApi(id:string){


    return this.http.delete(`${this.server_url}/delete-recipe/${id}`,this.addToken())

  }

getChatdata(){
  this.downloadListAPI().subscribe((res:any)=>{
    
    let  output:any={}
    let downloadArralist:any=[]
      res.forEach((item:any)=>{

        let cuisine=item.recipeCuisine
        let currentCount=item.count
        if(output.hasOwnProperty(cuisine)){

          output[cuisine]+=currentCount


        }
        else{
          output[cuisine]=currentCount

        }

      })
      console.log(output);

      for(let cuisine in output){
        downloadArralist.push({name:cuisine,y:output[cuisine]})
      }
      console.log(downloadArralist);
      localStorage.setItem("chart",JSON.stringify(downloadArralist))
      

      
     
    

  })
}
  
  
}
