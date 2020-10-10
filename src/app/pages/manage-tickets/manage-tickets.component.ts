import { Component, OnInit } from '@angular/core';
import {CommonHttpService} from '../../services/common-http.service';
import TimeAgo from 'javascript-time-ago';
 
// English.
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en);
@Component({
  selector: 'app-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.css']
})
export class ManageTicketsComponent implements OnInit {
  
  data:any = [];
  open:any = 0;
  closed:any = 0;
  hold:any = 0;
  constructor(private httpSrv:CommonHttpService) { }

  ngOnInit() {
    this.httpSrv.getTicketList().subscribe(data=>{
      this.data = JSON.parse(data);
      this.data = this.data.data;
      console.log("data in manage",this.data);
      this.getdat(this.data);
      
    },error=>{
      console.log("wrror while getting list of tickets",error);
    });
    
  }

getdat(data:any){
  data.forEach(obj => {
    
    if(obj.status == 'Open'){
      this.open++;
    }
    if(obj.status == 'Closed'){
      this.closed++;
    }
    if(obj.status == 'Hold'){
      this.hold++;
    }
  });
  
  
}

}
