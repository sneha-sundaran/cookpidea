import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})



export class DashboardComponent {

isSidebarOpen:boolean=true
colWidth:string='col-lg-10'
userCount:number=0
recipesCount:number=0
testmonialCount:number=0
downloadCount:number=0
selected=new Date()



Highcharts: typeof Highcharts = Highcharts;

chartOptions: Highcharts.Options = {
 
}

constructor(private router:Router,private api:ApiService){
  if(localStorage.getItem("chart")){
    let ChartData=JSON.parse(localStorage.getItem("chart")|| "")
     this.chartOptions={
    chart: {
      type: 'bar'
  },
  title:{
    text:'Analysis of Download Recipes Based on Cusine',
    align:'left'
  },
  xAxis: {
    type: 'category',
},
yAxis:{

  title:{
    text:'Total Downloaad recipes count'
  }
 
}
,
legend:{
  enabled:false
},
credits:{
  enabled:false
},
series:[{
  name:"Cuisine",
  colorByPoint:true,
  type:'bar',
  data:ChartData


}]

  }
  }

 
}


ngOnInit(){
  this.getuserCount()
  this.getallRecipess()
  this.getDownloadRecipe()
  this.getRequsetCount()
}

menuButtonClick(){
  this.isSidebarOpen=!this.isSidebarOpen
  this.colWidth='col'
}

logoutAdmin(){
  sessionStorage.clear()
  localStorage.clear()
  this.router.navigateByUrl('/')
}

getuserCount(){
  this.api.getAllusersAPI().subscribe((res:any)=>{
    this.userCount=res.length
  })
}

getallRecipess(){
  this.api.getAllrecipeAPI().subscribe((res:any)=>{
    this.recipesCount=res.length
  })
}

getDownloadRecipe(){
  this.api.downloadListAPI().subscribe((res:any)=>{



    this.downloadCount=res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)


  })
}

getRequsetCount(){
  this.api.testmonialApi().subscribe((res:any)=>{
   this.testmonialCount=res.filter((item:any)=>item.status=='Pending').length
    })
}
}
