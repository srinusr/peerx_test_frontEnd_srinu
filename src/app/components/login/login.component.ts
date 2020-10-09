import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {CommonHttpService} from '../../services/common-http.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,private httpSrv:CommonHttpService,private router:Router,
    private route:ActivatedRoute) {
    
   }

  ngOnInit() {
    this.loginForm = this.fb.group({
      "userId": ["",Validators.required],
      "password":["", Validators.required]
      });
  }

  get () { return this.loginForm.controls; }

  login(){
    for(let val in this.loginForm.value){
      this.loginForm.value[val] = this.loginForm.value[val].trim();
    }
    // if(!isNullOrUndefined(this.authService.login(this.loginForm.value))){
    //   this.activeModal.close();
    // };
    console.log("u fool",this.loginForm.value);
    
    this.httpSrv.login(this.loginForm.value).subscribe(data => {
      console.log("data ",data);
      
      localStorage.setItem("username",data);
      this.router.navigate(['/newtc']);
    }, error => {
      console.log("error while login");
      
    })
  }
}
