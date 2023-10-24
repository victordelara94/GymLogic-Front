import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Logged } from 'src/model/user.type';
import { State } from 'src/types/state.type';
import { mockLoginData, mockRoutine, mockUserNoId } from '../../mock/mock.spec';
import { RepoUserService } from './repo.user.service';
import { StateService } from './state.service';
describe('RepoUserService', () => {
  let repoUserService: RepoUserService;
  let httpMock: HttpTestingController;
  let state: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoUserService, StateService],
    });
    state = TestBed.inject(StateService);
    spyOn(state, 'getState').and.returnValue(
      of({ actualUser: { token: 'test' } as Logged } as State)
    );
    repoUserService = TestBed.inject(RepoUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repoUserService).toBeTruthy();
  });

  it('should send a POST request when calling create', () => {
    repoUserService.create(mockUserNoId).subscribe(() => {});

    const createReq = httpMock.expectOne(
      'http://localhost:3333/users/register'
    );
    expect(createReq.request.method).toBe('POST');
    createReq.flush({});
  });

  it('should send a PATCH request when calling login', () => {
    repoUserService.login(mockLoginData).subscribe(() => {});

    const loginReq = httpMock.expectOne('http://localhost:3333/users/login');
    expect(loginReq.request.method).toBe('PATCH');
    loginReq.flush({});
  });
  it('should send a PATCH request when calling addActualRoutine', () => {
    repoUserService.addActualRoutine(mockRoutine.id).subscribe(() => {});

    const addActualRoutineReq = httpMock.expectOne(
      'http://localhost:3333/users'
    );
    expect(addActualRoutineReq.request.method).toBe('PATCH');
    addActualRoutineReq.flush({});
  });
  it('should send a GET request when calling getAll', () => {
    repoUserService.getAll().subscribe(() => {});

    const getAllReq = httpMock.expectOne('http://localhost:3333/users');
    expect(getAllReq.request.method).toBe('GET');
    getAllReq.flush({});
  });
  it('should send a GET request when calling getById', () => {
    repoUserService.getById('test').subscribe(() => {});

    const getByIdReq = httpMock.expectOne('http://localhost:3333/users/test');
    expect(getByIdReq.request.method).toBe('GET');
    getByIdReq.flush({});
  });
  it('should handle error in create', () => {
    repoUserService.create(mockUserNoId).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('test');
      },
    });

    const registerReq = httpMock.expectOne(
      'http://localhost:3333/users/register'
    );
    expect(registerReq.request.method).toBe('POST');
    registerReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
  it('should handle error in login', () => {
    repoUserService.login(mockLoginData).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('401 Unauthorized');
      },
    });

    const loginReq = httpMock.expectOne('http://localhost:3333/users/login');
    expect(loginReq.request.method).toBe('PATCH');
    loginReq.flush(
      { message: '401 Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });
  it('should handle error in addActualRoutine', () => {
    repoUserService.addActualRoutine(mockRoutine.id).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('test');
      }
    );

    const addActualRoutineReq = httpMock.expectOne(
      'http://localhost:3333/users'
    );
    expect(addActualRoutineReq.request.method).toBe('PATCH');
    addActualRoutineReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
  it('should handle error in getAll', () => {
    repoUserService.getAll().subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(401);
      },
    });

    const getAllReq = httpMock.expectOne('http://localhost:3333/users');
    expect(getAllReq.request.method).toBe('GET');
    getAllReq.flush(
      { message: 'test' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });
  it('should handle error in getById', () => {
    repoUserService.getById('test').subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('test');
      },
    });

    const getByIdReq = httpMock.expectOne('http://localhost:3333/users/test');
    expect(getByIdReq.request.method).toBe('GET');
    getByIdReq.flush(
      { message: 'test' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });
});
describe('RepoUserService', () => {
  let repoUserService: RepoUserService;
  let httpMock: HttpTestingController;
  let state: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StateService],
    });
    state = TestBed.inject(StateService);
    spyOn(state, 'getState').and.returnValue(of({} as State));
    repoUserService = TestBed.inject(RepoUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(repoUserService).toBeTruthy();
  });
});
