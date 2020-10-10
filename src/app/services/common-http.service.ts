import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {
  private PHP_API_SERVER = "http://127.0.0.1:8080";
  getKeys = Object.keys;

  constructor(private httpClient: HttpClient, private router: Router,
    private route: ActivatedRoute) { }



  getHeaders() {
    const options = { headers: {}}
    options.headers['Content-Type'] = 'application/json';
    options.headers['Authorization'] = "ca2e56a68d01e393c0e4c5aa5638729c";
    options.headers['orgId'] = "60001280952";
    options.headers['Access-Control-Allow-Origin'] = '*';
    options.headers["Access-Control-Allow-Credentials"] = "true";
    // options.headers["Access-Control-Allow-Headers"] = "Content-Type";


    return options;
  }

  addnewApi(data: any): Observable<any> {
    
    // const formData: FormData = new FormData();
    // formData.append('fileKey', uploadFile, uploadFile.name);
    // data['file']:formData = formData;
    // console.log("post data", data);
    let fd = new FormData();
      for(let key of this.getKeys(data)){
        fd.append(key,data[key])
      }
      console.log("before sending form data",fd,data);
      
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/api/create.php`, data);
  }

  getTicketList():Observable<any> {
    // let header = new HttpHeaders();
    // header.set("Authorization", "ca2e56a68d01e393c0e4c5aa5638729c");
    // header.set("orgId", "60001280952");
    // header.set("Access-Control-Allow-Origin","*");
    // return this.httpClient.get("https://desk.zoho.in/api/v1/tickets", {headers:{'Authorization':'Authorization','orgId':'60001280952','content-type':'application/text'}});
    let dat:any;
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/api/read.php`);
    //   console.log("alskdjf",data);
      
    // },error=>{
    //   console.log("sldkg",error.status);
      
    //    dat = error.error.text;
    // });
    // console.log("sldkg",dat);
    // return dat;

  }

  login(userInfo: any): Observable<any> {
    let data = {
      userid: userInfo.userId,
      password: userInfo.password
    }
    console.log("before sending login", data);

    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/api/login.php`, data);
  }


  isLoggedIn() {
    return localStorage.getItem('username') ? true : false;

  }
  logout() {

    console.log("removed username", localStorage.removeItem('username'));
    this.router.navigate(['/']);
  }

}
