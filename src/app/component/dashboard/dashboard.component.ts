import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Booksinterface } from 'src/app/interface/booksinterface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isShow:Boolean=true;
  books:Booksinterface | any;
  constructor(private router:Router, private bookservice:BookService) { }

  ngOnInit(): void {
     this.bookservice.getbooks().subscribe((resp)=>{
      this.books = resp;
    });

    console.log(this.books );

  }

  addbooks(){
      this.router.navigate(['/dashboard/addbooks']);
  }

  editbook(id:any){
    this.router.navigate([`/dashboard/addbooks/id=${id}`]);
  }

  deletebook(id:string){
    this.bookservice.deleteBook(id).subscribe((resp:any)=>{
      if(resp){
        console.log("data deleted");
      }
    })
  }

  

}
