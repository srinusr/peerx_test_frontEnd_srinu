import { Component,OnInit } from '@angular/core';
import {CommonHttpService} from './services/common-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'peerxp';
  
constructor(private apiService:CommonHttpService){
}

ngOnInit(){
}




}
