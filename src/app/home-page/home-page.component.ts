import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../players/player.service';
import { iPlayer } from '../players/player';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private players = [];
  constructor(private playerService:PlayerService, private authService:AuthService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(doc => {
      this.players =  doc.map(object =>{
        return {
          id:  object.payload.doc.id,
          ...object.payload.doc.data()
        };
      });    
    });
    
  }

//Testing DB
// getAllDocuments(){
//   this.playerService.getAllDocs().subscribe(item =>{
//     //console.log(item[0]);
//     //console.log(item[0].payload);
//     console.log(item[0].payload.doc);
//     console.log(item[0].payload.doc.id);
//     console.log(item[0].payload.doc.data());
//   });
// }



  public login(){
    this.authService.login().subscribe(
      item => {
        console.log(this.authService.isLoggedIn);
      }
    );
   }

   public logout(){
    this.authService.logout()
     console.log(this.authService.isLoggedIn);
    }

 }


