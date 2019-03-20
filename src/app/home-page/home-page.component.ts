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
  private players: iPlayer[] = [];
  constructor(private playerService:PlayerService, private authService:AuthService) { }

  ngOnInit() {
    console.log('HttpDemoComponent::ngOnInit()');
    console.log("Before getting data from database");
    console.log(this.players);
    this.playerService.getPlayers().subscribe(
      //returns an observable obj that u can subscribe to
      //subscribing to the db putting data from server into
      //the above players[] array
      data => {
        console.log("The data from database");
        console.log(data);
        //from the db server
        this.players = data;
        console.log("After getting data from database");
        console.log(this.players);
      }
    );
    
  }

//Testing DB
getAllDocuments(){
  this.playerService.getAllDocs().subscribe(item =>{
    console.log(item[0]);
    console.log(item[0].payload);
    console.log(item[0].payload.doc);
    console.log(item[0].payload.doc.id);
    console.log(item[0].payload.doc.data());
  });
}



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


