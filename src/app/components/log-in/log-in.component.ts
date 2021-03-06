import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../../_helpers/must-match.validator';
import { UserService } from './../../services/user.service';
// import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit{

  hide = true;

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  user = {} as User;
  users: User[];

  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    // private authService: AuthService,
    private router: Router,
     ) { }





  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, ]],
      address: ['', [Validators.required]],
      uf: ['', [Validators.required, Validators.maxLength(2)]],
      country: ['', [Validators.required]],

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(): any {
    this.submitted = true;

    if (this.registerForm.invalid) {
      alert('vim aqui')
      return ;
    }
    else{
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      return this.userService.saveUser(this.user = this.registerForm.value).subscribe((user: User)=>{
        this.user = user;
      });
    }
  }
  loginSubmit(){

    // const val = this.loginForm.value;

    // if(this.loginForm.invalid){
    //   alert('deu ruim')
    //   return;
    // } else{
    //   if(val.email && val.password){
    //     this.authService.login(val.email, val.password)
    //       .subscribe(()=>{
    //         alert('User logado');
    //         this.router.navigateByUrl('/dashboard');
    //       })
    //   }
    // }
  }
  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
