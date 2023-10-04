import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RepoUserService } from 'src/app/service/repo.user.service';
import { mockUserRepo } from '../../../mock/mock.spec';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let registerComponent: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'user/login', component: LoginComponent },
        ]),
      ],
      providers: [{ provide: RepoUserService, useValue: mockUserRepo }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    registerComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(registerComponent).toBeTruthy();
  });
  it('registerHandleSubmit valid', () => {
    registerComponent.registerForm.setValue({
      userName: 'test',
      password: 'test',
      email: 'test@hotmail',
      age: '7',
      height: '7',
      weight: '7',
    });
    spyOn(mockUserRepo, 'create').and.callThrough();
    registerComponent.handleSubmit();
    expect(mockUserRepo.create).not.toBeNull();
  });
  it('registerHandleSubmit not valid', () => {
    registerComponent.registerForm.setValue({
      userName: 'test',
      password: 'test',
      email: 'test',
      age: '7',
      height: '7',
      weight: '7',
    });
    registerComponent.handleSubmit();
    expect(registerComponent.errorMessage).toBe('Rellene todos los campos');
  });
});
