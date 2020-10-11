import { Component, OnInit , ElementRef , ViewChild} from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { Router, ActivatedRoute } from '@angular/router';



import {FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CommonHttpService} from '../../services/common-http.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AddTicketComponent implements OnInit {
  ticketform:FormGroup;
  img_id:any = [];
  @ViewChild('richtxt', { static: true }) rich: ElementRef;
  selectedFiles: FileList;
  imgPath:any;
  fileIfo:Observable<any>;
  
  constructor(private fb:FormBuilder,private toastr: ToastrService,private httpSrv:CommonHttpService,private router:Router) { }

  ngOnInit() {
    
    this.ticketform = this.fb.group({
      departmentId : ["",Validators.required],
      category : ["",Validators.required],
      cf : ["",Validators.required],
      subject : ["",Validators.required],
      contactName : ["",Validators.required],
      email : ["",Validators.required],
      phone : ["",Validators.required],
      priority : ["",Validators.required],
      description:[""]
    })
  }


  get () { return this.ticketform.controls; }


  handleFileInput(event) {
    this.selectedFiles = event.target.files;
    
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.uploadFileToActivity(this.selectedFiles[i]);
    }
  }
  uploadFileToActivity(file) {
    
    this.httpSrv.postFile(file).subscribe(data => {
      this.img_id.push(data.id);
        console.log("imagaurl",this.img_id);
      // this.onSubmit();
      
      }, error => {
        // console.log("error while file upload",error);
      });
  }


  uploadNewTicket(){
    
      // this.ticketform.patchValue({description:this.rich['angularValue'].replace( /(<([^>]+)>)/ig, '')});
      this.ticketform.patchValue({description:this.rich['angularValue']});
      let postData:any ={};
      
      postData.category = this.ticketform.get('category').value;
      postData.cf =  {"cf_pwslab_project_url": this.ticketform.get('cf').value};
      // postData.contactName =  this.ticketform.get('contactName').value;
      postData.departmentId =  this.ticketform.get('departmentId').value;
      postData.description =  this.ticketform.get('description').value;
      postData.email =  this.ticketform.get('email').value;
      postData.phone =  this.ticketform.get('phone').value;
      postData.priority =  this.ticketform.get('priority').value;
      postData.subject =  this.ticketform.get('subject').value;
      postData.contact = {"email": this.ticketform.get('email').value};
     
      

    
    this.httpSrv.addnewApi(postData).subscribe(data=>{
      
      this.toastr.success("New Tiicket Added!", "Success!");
      this.router.navigate(['/managetc']);
      
    },error=>{
      this.toastr.error("Error while adding new ticket!", "Success!");
      console.log("error while tc",error);
      
    });
    
    
  }
  discard(){
    this.ticketform.reset();
  }
}
