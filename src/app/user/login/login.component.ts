import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepoUserService } from 'src/app/service/repo.user.service';
import { StateService } from 'src/app/service/state.service';
import { Logged, Login } from 'src/model/user.type';

@Component({
  selector: 'GymLogic-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  actualUser!: Logged | null;
  loginForm: FormGroup;
  errorMessage: string | null;
  constructor(
    private stateService: StateService,
    public fb: FormBuilder,
    private repo: RepoUserService,
    private router: Router
  ) {
    this.errorMessage = null;
    this.stateService.state$.subscribe(
      (state) => (this.actualUser = state.actualUser)
    );

    this.loginForm = this.fb.group({
      userName: ['celia', [Validators.required, Validators.minLength(2)]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }
  handleSubmit() {
    this.errorMessage = null;
    if (!this.loginForm.valid) {
      this.errorMessage = 'Por favor rellene todos los campos';
      return;
    }

    const data: Login = {
      ...this.loginForm.value,
    };

    this.repo.login(data).subscribe({
      next: (response) => {
        this.stateService.login(response);

        if (this.actualUser?.user?.role === 'admin') {
          this.router.navigateByUrl('adminHome');
          return;
        }
        this.router.navigateByUrl('routines/list');
      },
      error: (error) => {
        this.errorMessage = 'Los datos no son correctos';
      },
    });
  }
}
