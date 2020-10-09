import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {
 private PHP_API_SERVER = "http://127.0.0.1:8080";
 getKeys = Object.keys;
  constructor(private httpClient: HttpClient,private router:Router,
    private route:ActivatedRoute) { }

    getHeaders() {
      const options = { headers: {}}
      options.headers['Content-Type'] = 'application/json';
      options.headers['Access-Control-Allow-Origin'] = "*";
      options.headers['Authorization']='Zoho-oauthtoken 1000.3d0a155402dbb59f776fd63adb1e67c0.a41ea557a6a8d7e402690098b2056f60s';
      return options;
    }

  addnewApi(postdata:any):Observable<any>{
    console.log("post data",postdata);
    const formData: FormData = new FormData();
    formData.append('fileKey', postdata.file, postdata.file.name);
    postdata['formdata'] = formData;
    return this.httpClient.post("https://desk.zoho.com/api/v1/tickets",postdata,this.getHeaders());
  }

  getTicketList():Observable<any>{
    return this.httpClient.get("https://desk.zoho.com/api/v1/tickets",this.getHeaders());
  }

  login(userInfo: any):Observable<any>{
    let data = {
      userid:userInfo.userId,
      password:userInfo.password
    }
    console.log("before sending login",data);
    
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/api/login.php`, data);
  }


  isLoggedIn(){
   return localStorage.getItem('username')?true:false;
   
  }
  logout(){
    console.log("aslkfj");
    
    console.log("sdjf",localStorage.removeItem('username'));
    this.router.navigate(['/']);
  }
  
}
