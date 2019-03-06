import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from './player-list/player-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import {AuthGuardService} from './auth-guard.service';

const routes: Routes = [
  {path: 'players', component: PlayerListComponent, canActivate:[AuthGuardService]},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers:[AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
