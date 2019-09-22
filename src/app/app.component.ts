import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppComponent {

constructor(private formBuilder: FormBuilder , private modalService: NgbModal,) { }
  addUserForm: FormGroup;
  submitted = false;
  title = 'finology';
  editMode: boolean = false;
  selectedUser:Array<number> = []; 
  @ViewChild('addPeopleModal')
  addPeopleModal: TemplateRef<any>;
  @ViewChild('descriptionModal')
  descriptionModal: TemplateRef<any>;
  currentItemIndex:any;
  ////for detail
  detailImage:any = null;
  detailName:string = '';
  detailPosition:string = '';
  detailDescr:string = '';

ngOnInit() {
  this.addUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    position: ['', Validators.required],
    description: ['', Validators.required],
    picture: ['', Validators.required],
})

}

// convenience getter for easy access to form fields
get f() { return this.addUserForm.controls; }

openModal() {
  this.submitted = false;
  this.addUserForm.reset();
  this.url = null;
      this.modalService.open(this.addPeopleModal,
      { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false, centered: true });

 
} 
////for smooth scroll
scrollToElement($element): void {
  //console.log($element);
  $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

onSubmit() {
  this.submitted = true;
debugger
  // stop here if form is invalid
  if (this.addUserForm.invalid) {
      return;
  }
  this.usersList.push(
    {
     
        name:this.addUserForm.value.name, 
        position:this.addUserForm.value.position, 
        imgSrc:this.url,
        description:this.addUserForm.value.description      
    }
  );
  this.addUserForm.reset();
  this.url = null;  
  this.modalService.dismissAll();
}

showDescriptionModal(idx) {
  
  this.modalService.open(this.descriptionModal,
    { ariaLabelledBy: 'modal-basic-title',windowClass:'detailModal', centered: true });
this.detailImage = this.usersList[idx].imgSrc;
this.detailName = this.usersList[idx].name;
this.detailPosition = this.usersList[idx].position;
this.detailDescr= this.usersList[idx].description;

}

editUser(index) {
  this.editMode = true;
  this.submitted = false;
  this.modalService.open(this.addPeopleModal,
    { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false, centered: true });
    this.addUserForm = this.formBuilder.group({
      name: [this.usersList[index].name, Validators.required],
      position: [this.usersList[index].position, Validators.required],
      description: [this.usersList[index].description, Validators.required],
      picture: ['', Validators.required],
  });
  this.url = this.usersList[index].imgSrc;
  this.currentItemIndex = index;
}

updateUser(idx) {
  this.editMode = true;
  this.submitted = true;
this.usersList[idx].name = this.addUserForm.value.name;
this.usersList[idx].position = this.addUserForm.value.position;
this.usersList[idx].description = this.addUserForm.value.description;
this.usersList[idx].imgSrc = this.url;
this.modalService.dismissAll();  
}

editPeople($event:any) {
  this.editMode = true;
  console.log($event);
}

Cancel($event) {
  this.editMode = false;
}



onSelectionChange($event:any, arrIndex:number) {
  
  const checked = $event.target.checked; // stored checked value true or false
  if(checked == true) {
this.selectedUser.push(arrIndex);
  } else {    
    const index = this.selectedUser.indexOf(arrIndex);
    this.selectedUser.splice(index, 1);
  }
  

}
  deleteUser($event) {

    if (this.selectedUser.length > 0) {     
      this.selectedUser =  this.selectedUser.sort(function(a, b){return b - a});
      for(var i =0; i< this.selectedUser.length; i++ ){        
        let index = this.selectedUser[i];
        this.usersList.splice(index, 1);       

      }
      this.selectedUser = [];
    } 
  }


public imagePath;
url: any = '';
public message:string='';
  onSelectFile(event) { // called each time file input changes
    this.message = '';
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
      var reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { 
        this.url = reader.result; //add source to image
        
      }
    }
}

  usersList:any = [
    {
      name:'Frank Ltarnam', 
      position:'CEO', 
      imgSrc:'assets/4-people/gaetan-houssin.jpg',
      description:'Lorem Ipsum has been the industry standard dummy text ever'
    },
    {
      name:'Bob Shefley', 
      position:'UI/UX Designer', 
      imgSrc:'assets/4-people/nicolas-lebarreau.jpg',
      description:'Lorem Ipsum has been the industry standard dummy text ever'
    },
    {
      name:'Json Stewars', 
      position:'Full-stack Developer', 
      imgSrc:'assets/4-people/jerome-mahuet.jpg',
      description:'Lorem Ipsum has been the industry standard dummy text ever'
    },
    {
      name:'Sabrina Rachel', 
      position:'Marketing', 
      imgSrc:'assets/4-people/manuela-faveri.jpg',
      description:'Lorem Ipsum has been the industry standard dummy text ever'
    },
    {
      name:'Marissa Lawren', 
      position:'Customer Support', 
      imgSrc:'assets/4-people/darlene-chabrat.jpg',
      description:'Lorem Ipsum has been the industry standard dummy text ever'
    },
    {
      name:'Romane Reged', 
      position:'Jr UI/UX Designer', 
      imgSrc:'assets/4-people/romane-regad.jpg',
      description:'Lorem Ipsum has been the industry standard dummy text ever'
    },
    {
      name:'Tania Ferreira', 
      position:'Business Analyst', 
      imgSrc:'assets/4-people/tania-ferreira.jpg',
      description:'Lorem Ipsum has been the industry standard dummy text ever'
    }
    
]



}
