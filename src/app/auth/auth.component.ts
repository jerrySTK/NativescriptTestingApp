import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  isLoginForm = true;

  constructor(private router: RouterExtensions) { }

  ngOnInit() {
      this.form = new FormGroup({
          username: new FormControl(null, {updateOn:'change', validators: [Validators.required]}),
          password: new FormControl(null, {updateOn:'change', validators:[Validators.required, Validators.minLength(6)]})
      })
  }

  onSwitch(){
      this.isLoginForm = !this.isLoginForm;
  }

  onLogin() {


        this.router.navigate(['/challenges'],{
            clearHistory: true
        });
  }

}
