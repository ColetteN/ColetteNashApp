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
  private players = [];

  constructor(private playerService:PlayerService) { }

  ngOnInit() {
    //getPlayers() returns an observable array of firebase documents(object)
    this.playerService.getPlayers()
    //subscribing to the document, 
      .subscribe(docs => {
      //maps the document based on the below and puts into the players array
      this.players =  docs.map(item => {
        //for each item, maps that item to the local array
        return {
          id:  item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });    
      console.log(this.players)
    });
    
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


    this.clearForm();
  } 

  public deleteItem(itemToDelete) {
    //calling the delete function in the playerService
    this.playerService.deletePlayer(itemToDelete.id)
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

   public updateItem(idVal: number,playernameVal: string, dobVal: string, parentnameVal: string, parentmobileVal:string) {
    // Create an iPlayer object. Set the id to 0 as this will be set on
    // the server to a correct value
    let player:iPlayer = {
      playername: playernameVal, 
      dob: dobVal, 
      parentname:parentnameVal, 
      parentmobile:parentmobileVal
    };
   
    //calling the updatePlayer function
    this.playerService.updatePlayer(idVal, player)

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
