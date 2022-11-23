import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false

  hide = true;

  Form = new FormGroup({
    email: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required])
  })

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private titleService: Title, private AuthSevice: AuthentificationService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login | Clepsydre')
  }

  login() {
    if (!this.Form.valid) {
      return
    }
    this.isLoading = true

    this.AuthSevice.login(this.Form.controls.email.value, this.Form.controls.password.value).subscribe({
      next: (value: any) => {
        this.isLoading = false;

        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';
        this._router.navigateByUrl(redirectURL);
      },
      error: (err: any) => { this.isLoading = false }
    })
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
