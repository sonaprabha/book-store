import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import Validation from '../../utils/validation';
import { ApiserviceService } from 'src/app/services/apiservice.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup|any;
  submitted = false;
  errorMessage:any;
  constructor(private formBuilder: FormBuilder,private authservice:ApiserviceService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

   onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    const data ={
      email:this.form.value.email,
      fullname:this.form.value.fullname,
      password:this.form.value.password,
      username:this.form.value.username,
    }
  
    const response =  this.authservice.register(data).subscribe(  (res: any) => {
    },
    (error) => {
      this.errorMessage = error.error?.error;
    },
    );

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}