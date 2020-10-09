import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../../services/common-http.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private httpSrv:CommonHttpService) {
   }

  ngOnInit() {
  }
  isLoggedIn(){
    return this.httpSrv.isLoggedIn();
  }
  logout(){
    this.httpSrv.logout();
  }
}
