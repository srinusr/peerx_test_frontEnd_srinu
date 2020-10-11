import { Component, OnInit , ElementRef , ViewChild} from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { Router, ActivatedRoute } from '@angular/router';



import {FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CommonHttpService} from '../../services/common-http.service';


@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AddTicketComponent implements OnInit {
  ticketform:FormGroup;
  img_id:any;
  @ViewChild('richtxt', { static: true }) rich: ElementRef;
  
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
      file:null,
      description:""
    })
  }


  get () { return this.ticketform.controls; }


  handleFileInput(files: FileList) {
    this.ticketform.patchValue({file:files[0]});
  }
  uploadFileToActivity() {
    
    this.httpSrv.postFile(this.ticketform.get('file').value).subscribe(data => {
      // do something, if upload success
      console.log("imagaurl",data.id);
      this.img_id = data.id;
      this.uploadNewTicket();
      // this.onSubmit();
      
      }, error => {
        console.log("error while file upload",error);
      });
  }


  uploadNewTicket(){
    
      this.ticketform.patchValue({description:this.rich['angularValue'].replace( /(<([^>]+)>)/ig, '')});
      let postData:any = {};
      postData.category = this.ticketform.get('category').value;
      postData.cf =  {cf_pwslab_project_url: this.ticketform.get('cf').value};
      postData.contactName =  this.ticketform.get('contactName').value;
      postData.departmentId =  this.ticketform.get('departmentId').value;
      postData.description =  this.ticketform.get('description').value;
      postData.email =  this.ticketform.get('email').value;
      postData.phone =  this.ticketform.get('phone').value;
      postData.priority =  this.ticketform.get('priority').value;
      postData.subject =  this.ticketform.get('subject').value;
      postData.uploads =  [this.img_id];
    
    this.httpSrv.addnewApi(postData).subscribe(data=>{
      console.log("data new tc",data);
      
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
