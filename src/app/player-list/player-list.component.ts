import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../players/player.service';
import { iPlayer } from '../players/player';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  id = new FormControl ('');
  name = new FormControl ('');
  dob = new FormControl ('');
  parentname = new FormControl ('');
  parentmobile = new FormControl ('');

  public editing = false;
//empty array of players
//local array 
  private players: iPlayer[] = [];

  constructor(private playerService:PlayerService) { }

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

  public addNewItem(idVal: number,playernameVal: string, dobVal: string, parentnameVal: string, parentmobileVal:string) {
    // Create an iPlayer object. Set the id to 0 as this will be set on
    // the server to a correct value
    let player:iPlayer = {
      playername: playernameVal, 
      dob: dobVal, 
      parentname:parentnameVal, 
      parentmobile:parentmobileVal
      };

    // //adds player to the db
      this.playerService.addPlayer(player);
    // the above does the same as this........
    // this.playerService.addPlayer(player);
    // this.players.push(player);

    this.clearForm();
  } 

  public deleteItem(itemToDelete: iPlayer) {
    // I have to assign something to this.todos as this is what triggers angular to refresh
    // the components template

    //delete from the db mock server here
    this.playerService.deletePlayer(itemToDelete).subscribe(
      delItem => { 
        this.players.splice(
          //find the index of the item we want to delete by matching their ids 
          this.players.findIndex(player => player.id === itemToDelete.id),1
        ); 
      }
    );
    // the above does the same as this........
    //this.playerService.deletePlayer(itemToDelete)
    //.subscribe( variableName => { }
    //this.players.splice(this.players.findIndex(player => player.id === itemToDelete.id),1)
   }

   public editItem(itemToEdit: iPlayer){
    //when we click edit fill the form with the following......
    this.id.setValue(itemToEdit.id);
    this.name.setValue(itemToEdit.playername);
    this.dob.setValue(itemToEdit.dob);
    this.parentname.setValue(itemToEdit.parentname);
    this.parentmobile.setValue(itemToEdit.parentmobile);
    this.editing = true;
   }

   public updateItem(
    idVal: number,
    playernameVal: string, 
    dobVal: string, 
    parentnameVal: string, 
    parentmobileVal:string) {
    // Create an iPlayer object. Set the id to 0 as this will be set on
    // the server to a correct value
    let player:iPlayer = {
      id: idVal, 
      playername: playernameVal, 
      dob: dobVal, 
      parentname:parentnameVal, 
      parentmobile:parentmobileVal
    };
    // get the player service and the function we need to work with 
    //from this ie. the update function

    //Find the index of the player we want to update using the players id
    var playerIndex = this.players.findIndex(item => item.id === player.id)

    //Updates the local players array with the new data added in from the form
    this.players[playerIndex] = player

    //Get the <Player> object that we want to update on the database and stored in var
    var playerToUpdate = this.players[playerIndex];

    //passes the <Player> var from above into the updatePlayer function on the player.service.ts
    //the player.service.ts then handles the updating
    this.playerService.updatePlayer(playerToUpdate).subscribe(item => { 
      console.log(item);
    })

    this.editing = false;
    this.clearForm();
   }

   public clearForm(){
    //when we click edit fill the form with the following......
    this.id.setValue(null);
    this.name.setValue("");
    this.dob.setValue("");
    this.parentname.setValue("");
    this.parentmobile.setValue("");
    this.editing = false;
   }
  
}
