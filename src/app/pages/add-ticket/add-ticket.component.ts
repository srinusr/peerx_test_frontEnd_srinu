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
  @ViewChild('richtxt', { static: true }) rich: ElementRef;
  
  constructor(private fb:FormBuilder,private toastr: ToastrService,private httpSrv:CommonHttpService,private router:Router) { }

  ngOnInit() {
    
    this.ticketform = this.fb.group({
      department : ["",Validators.required],
      category : ["",Validators.required],
      pwslab : ["",Validators.required],
      subject : ["",Validators.required],
      name : ["",Validators.required],
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
  uploadNewTicket(){
    
      this.ticketform.patchValue({description:this.rich['angularValue'].replace( /(<([^>]+)>)/ig, '')});
    
    this.httpSrv.addnewApi(this.ticketform.value).subscribe(data=>{
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
