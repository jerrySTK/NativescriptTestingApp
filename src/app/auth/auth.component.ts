import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'ns-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    form: FormGroup;
    isLoginForm = true;

    constructor(private router: RouterExtensions,
        private authService: AuthService) { }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, { updateOn: 'change', validators: [Validators.required] }),
            password: new FormControl(null, { updateOn: 'change', validators: [Validators.required, Validators.minLength(6)] })
        });
    }

    onSwitch() {
        this.isLoginForm = !this.isLoginForm;
    }

    onLogin() {
        if (this.isLoginForm) {
            this.authService.logIn(this.form.get('email').value,this.form.get('password').value)
                            .subscribe(e=>
                                this.router.navigate(['/challenges'], {
                                    clearHistory: true
                                })
                            );
        }
        else {
            this.authService.signUp(this.form.get('email').value,this.form.get('password').value)
                .subscribe(e=>
                    this.router.navigate(['/challenges'], {
                        clearHistory: true
                    })
                );
        }


    }
}
