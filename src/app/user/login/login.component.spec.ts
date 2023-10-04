import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AdminHomeComponent } from 'src/app/admin/admin.home/admin.home.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ListComponent } from 'src/app/routines/list/list.component';
import { RepoUserService } from 'src/app/service/repo.user.service';
import { StateService } from 'src/app/service/state.service';
import { Logged } from 'src/model/user.type';
import { mockUserRepo } from '../../../mock/mock.spec';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        RouterTestingModule.withRoutes([
          {
            path: 'routines/list',
            component: ListComponent,
          },
          { path: 'home', component: HomeComponent },
          { path: 'adminHome', component: AdminHomeComponent },
        ]),
      ],
      providers: [
        { provide: RepoUserService, useValue: mockUserRepo },
        { provide: StateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    loginComponent.actualUser = { user: { role: 'admin' } } as Logged;

    fixture.detectChanges();
  });

  it('loginComponent to be truthy', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('loginHandleSubmit valid', () => {
    spyOn(mockUserRepo, 'login').and.callThrough();

    loginComponent.loginForm.setValue({
      userName: 'test',
      password: 'testeado',
    });
    loginComponent.handleSubmit();
    expect(mockUserRepo.login).toHaveBeenCalled();
  });
  it('registerHandleSubmit not valid', () => {
    loginComponent.loginForm.setValue({
      userName: 'test',
      password: 'test',
    });
    loginComponent.handleSubmit();
    expect(loginComponent.errorMessage).toBe(
      'Por favor rellene todos los campos'
    );
  });
  it('RepoUserService throw an error', () => {
    spyOn(mockUserRepo, 'login').and.returnValue(throwError(() => {}));

    loginComponent.loginForm.setValue({
      userName: 'test',
      password: 'testeado',
    });
    loginComponent.handleSubmit();
    expect(mockUserRepo.login).toHaveBeenCalled();
  });
  it('if role is admin', () => {
    spyOn(mockUserRepo, 'login').and.returnValue(
      of({ role: 'admin' } as unknown as Logged)
    );

    loginComponent.loginForm.setValue({
      userName: 'test',
      password: 'testeado',
    });
    loginComponent.handleSubmit();
    expect(mockUserRepo.login).toHaveBeenCalled();
  });
});
