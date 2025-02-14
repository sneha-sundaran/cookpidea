import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-downloadlist',
  templateUrl: './downloadlist.component.html',
  styleUrl: './downloadlist.component.css'
})
export class DownloadlistComponent {

  downloadlist:any=[]
  
constructor(private api:ApiService){}


ngOnInit(){
  this.getDownloadlis()
}

getDownloadlis(){
  this.api.downloadListAPI().subscribe((res:any)=>{
    console.log(res);
    this.downloadlist=res
    
  })
}



}
