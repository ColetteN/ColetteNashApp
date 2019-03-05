import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
//create the Db function with some player properties inside
createDb() {
  const players = [
    { 
      id:1, 
      playername:'Colette Nash', 
      dob: '07/02/1971', 
      parentname:'Margaret Conlon', 
      parentmobile:'0860726443'
    },

    { id:2, 
      playername:'Kate Nash', 
      dob: '31/05/1992', 
      parentname:'Martin Nash', 
      parentmobile:'0870726443'
    }

  ];
  return {players};
}
  
}