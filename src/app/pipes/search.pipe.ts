import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
                  //passing arguments for searching  
  transform(allRecipies:any=[],searchKey:String): any[] {
    //
    let result:any=[]
    console.log(allRecipies,searchKey);
    

    if(!allRecipies || searchKey==""){
      return allRecipies
    }
    result=allRecipies.filter((item:any)=>item.name.toLowerCase().includes(searchKey.toLowerCase()))
    console.log(result);
    
    return result
  }

}
