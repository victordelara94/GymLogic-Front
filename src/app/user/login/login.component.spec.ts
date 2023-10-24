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
import { State } from 'src/types/state.type';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let state: StateService;
  let repo: RepoUserService;
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
      providers: [RepoUserService, StateService],
    }).compileComponents();
    repo = TestBed.inject(RepoUserService);
    state = TestBed.inject(StateService);
    spyOn(state, 'getState').and.returnValue(
      of({
        actualUser: { user: { role: 'user' } } as unknown as Logged,
      } as unknown as State)
    );
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    loginComponent.actualUser = { user: { role: 'admin' } } as Logged;

    fixture.detectChanges();
  });

  it('loginComponent to be truthy', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('loginHandleSubmit valid with admin role', () => {
    spyOn(repo, 'login').and.returnValue(
      of({ user: { role: 'admin' } } as Logged)
    );

    loginComponent.loginForm.setValue({
      userName: 'test',
      password: 'testeado',
    });
    loginComponent.handleSubmit();
    expect(repo.login).toHaveBeenCalled();
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
    spyOn(repo, 'login').and.returnValue(throwError(() => {}));

    loginComponent.loginForm.setValue({
      userName: 'test',
      password: 'testeado',
    });
    loginComponent.handleSubmit();
    expect(repo.login).toHaveBeenCalled();
  });
});
describe('LoginComponent', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let state: StateService;
  let repo: RepoUserService;
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
      providers: [RepoUserService, StateService],
    }).compileComponents();
    repo = TestBed.inject(RepoUserService);
    state = TestBed.inject(StateService);
    spyOn(state, 'getState').and.returnValue(
      of({
        actualUser: { user: { role: 'user' } } as unknown as Logged,
      } as unknown as State)
    );
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    loginComponent.actualUser = { user: { role: 'user' } } as Logged;

    fixture.detectChanges();
  });

  it('loginHandleSubmit valid and role is user', () => {
    spyOn(repo, 'login').and.returnValue(
      of({ user: { role: 'user' } } as Logged)
    );

    loginComponent.loginForm.setValue({
      userName: 'test',
      password: 'testeado',
    });
    loginComponent.handleSubmit();
    expect(repo.login).toHaveBeenCalled();
  });
});
