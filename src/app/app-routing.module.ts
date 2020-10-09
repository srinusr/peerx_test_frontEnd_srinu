import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import { from } from 'rxjs';
import {AddTicketComponent} from './pages/add-ticket/add-ticket.component';
import { ManageTicketsComponent } from './pages/manage-tickets/manage-tickets.component';


const routes: Routes = [
    {path:'',pathMatch:"full",redirectTo:'login'},
    {path:'login',component:LoginComponent},
    {path:'newtc',component:AddTicketComponent,canActivate:[AuthGuard]},
    {path:'managetc',component:ManageTicketsComponent,canActivate:[AuthGuard]},

  // {path:'statelevel',component:StatelevelformComponent,canActivate:[AuthGuard],data:{role:['state']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
