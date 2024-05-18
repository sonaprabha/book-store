import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Booksinterface } from 'src/app/interface/booksinterface';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.scss']
})
export class AddbooksComponent implements OnInit {

  bookform: FormGroup|any;
  editbook: boolean = false;
  bookData:any;
  id?: string;
  bookdata:Booksinterface | any;

  constructor(
    private fb: FormBuilder,
    private BookService: BookService,
    private activateRoutes:ActivatedRoute  
  ) {
    
    
  }
  
  
  ngOnInit(): void {
    this.id = this.activateRoutes.snapshot.params['id'];
    if(this.id){
      this.fetchDataById(this.id);
    }else{
    this.bookform = this.fb.group({
      authorname:['',Validators.required],
      title:['',Validators.required],
      price:['',Validators.required],
      type:[''],
      publicationyear:[''],
      language:[''],
      quantity:[''],
      available:[''],
    });
  }
}
  get f() {
    return this.bookform.controls;
  }
  fetchDataById(id:any){
    this.BookService.getBooksById(id).subscribe(resp=>{
      this.bookdata = resp;
      this.setUserData();
    });
  }

  async setUserData() {
    this.bookform.patchValue({
      authorname: this.bookdata.name,
      email: this.bookdata.email,
      title: this.bookdata.userName,
      price: this.bookdata.mobile,
      type:this.bookdata.type,
        language: this.bookdata.CountyCode,
        quantity: this.bookdata.statePostalCode,
        available: this.bookdata.cityName,
    });
  }


  onSubmit() {

    const data ={
      author:this.bookform.value.authorname,
      title:this.bookform.value.title,
      price:this.bookform.value.price,
      type:this.bookform.value.type,
      publicationyear:this.bookform.publicationyear,
      language:this.bookform.language,
      quantity:this.bookform.quantity,
      available:this.bookform.available
    }

   const response =  this.BookService.add(data).subscribe((resp:any)=>{

     this.bookData =resp;
   })
  //  });
    // const addData = this.BookService

    if (this.bookform.valid) {
    //   if (this.editMode) {
    //     this.BookService.updateItem(this.itemForm.value);
    //   } else {
    //     this.BookService.addItem(this.itemForm.value);
    //   }
    //   this.router.navigate(['/']);
    }
  }
}

