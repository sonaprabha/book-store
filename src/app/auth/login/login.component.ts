import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import Validation from '../../utils/validation';
  import { Router } from '@angular/router';
import {ApiserviceService} from '../../services/apiservice.service'
import { StorageServiceService } from 'src/app/services/storage-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup |any;
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  
    constructor(private authservice: ApiserviceService, private router: Router,private fb:FormBuilder,
      private storageService:StorageServiceService
    ) {}
    ngOnInit(): void {
      this.loginForm = this.fb.group({
        username:['',Validators.required],
        password:['',Validators.required],
      });
    }
    get f() {
      return this.loginForm.controls;
    }
    
    async loginUser() {
      const data ={
        username:this.loginForm.value.username,
        password:this.loginForm.value.password,
      }
      try {
      
        this.authservice.login(data).subscribe(response => {
          console.log("loginnnnnnnnnnnnnnnnn", response);
          const token = response.token;
          this.storageService.setItem("userData", JSON.stringify(response));
          this.storageService.setItem("token", token);
          this.router.navigate(['/dashboard']);


        })
      } catch (error) {
        this.errorMessage = 'Invalid username or password';
      }
    }

    registerUser(){
      this.router.navigate(['/register']);
    }
  }
  