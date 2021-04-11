import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStroageService } from 'src/app/services/local-stroage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  customer:Customer;
  customerDetail:CustomerDetails;
  isAuth:boolean;

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private customerService:CustomerService,private authService:AuthService,private localStorageService:LocalStroageService,private router:Router) { }

  ngOnInit(): void {this.createLoginForm();}

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.invalid){
      return this.toastrService.warning("", "Warning")
    }

    let loginModel = Object.assign({}, this.loginForm.value);

    this.authService.login(loginModel).subscribe(responseSuccess => {
      this.getCustomerByEmail(loginModel.email);
      this.localStorageService.setToken(responseSuccess.data.token)
    
      this.toastrService.success(responseSuccess.message);
      return this.router.navigate(['/cars'])
    })
    return true
  }

  getCustomerByEmail(email: string) {
    this.customerService.getCustomerByEmail(email).subscribe(response => {
       this.customerDetail = response.data;
       console.log(response.data.firstName);
       this.localStorageService.setCurrentCustomer(this.customerDetail);
    });
 }
}
