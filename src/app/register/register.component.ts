import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  roleState = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: [{ disabled: this.check() }],
      age: ['', Validators.required],
      city: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    const user = this.userService.getCurrentUser();
    this.roleState = (user && user.role == '1') ? true : false;
    if (!this.roleState) {
      this.form.get("role").setValue("3");
      this.form.get("role").disable();
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.userService.register(this.form.value);
    this.router.navigate(['../customers']);
  }

  check(): boolean {
    return this.userService.isAuthenticated();
  }
}
