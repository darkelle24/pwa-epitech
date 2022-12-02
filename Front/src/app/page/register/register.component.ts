import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/core/authentification/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean = false

  hide = true;

  Form = new FormGroup({
    email: new FormControl(undefined, [Validators.required]),
    username: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required])
  })

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private titleService: Title, private AuthSevice: AuthentificationService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle('Register | PWA Epitech')
  }

  getQuerry() {
    return this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/'
  }

  register() {
    if (!this.Form.valid) {
      return
    }
    this.isLoading = true

    this.AuthSevice.register(this.Form.controls.email.value, this.Form.controls.username.value, this.Form.controls.password.value).subscribe({
      next: (value: any) => {
        this.isLoading = false;

        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';
        this.router.navigateByUrl(redirectURL);
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
