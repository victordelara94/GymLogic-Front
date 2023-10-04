import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepoUserService } from 'src/app/service/repo.user.service';
import { User } from 'src/model/user.type';

@Component({
  selector: 'GymLogic-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null;
  constructor(
    private fb: FormBuilder,
    private repo: RepoUserService,
    private router: Router
  ) {
    this.errorMessage = null;
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]],
    });
  }
  handleSubmit() {
    if (!this.registerForm.valid) {
      this.errorMessage = 'Rellene todos los campos';
      return;
    }

    const data: Omit<User, 'id'> = { ...this.registerForm.value };
    this.repo.create(data).subscribe({
      next: (response) => {
        this.errorMessage = null;
        this.router.navigateByUrl('user/login');
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
