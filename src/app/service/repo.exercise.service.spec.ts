import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RepoExerciseService } from './repo.exercise.service';

import { of } from 'rxjs';
import { Logged } from 'src/model/user.type';
import { State } from 'src/types/state.type';
import { mockExerciseFormData } from '../../mock/mock.spec';
import { StateService } from './state.service';
describe('RepoExerciseService', () => {
  let repoExerciseService: RepoExerciseService;
  let httpMock: HttpTestingController;
  let state: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoExerciseService, StateService],
    });
    state = TestBed.inject(StateService);
    spyOn(state, 'getState').and.returnValue(
      of({ actualUser: { token: 'test' } as Logged } as State)
    );
    repoExerciseService = TestBed.inject(RepoExerciseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repoExerciseService).toBeTruthy();
  });

  it('should send a POST request when calling create', () => {
    repoExerciseService.create(mockExerciseFormData).subscribe(() => {});

    const createReq = httpMock.expectOne('http://localhost:3333/exercises');
    expect(createReq.request.method).toBe('POST');
    createReq.flush({});
  });

  it('should send a GET request when calling getAll', () => {
    repoExerciseService.getAll().subscribe(() => {});

    const getAllReq = httpMock.expectOne('http://localhost:3333/exercises');
    expect(getAllReq.request.method).toBe('GET');
    getAllReq.flush({});
  });
  it('should send a GET request when calling getById', () => {
    repoExerciseService.getById('test').subscribe(() => {});

    const getByIdReq = httpMock.expectOne(
      'http://localhost:3333/exercises/test'
    );
    expect(getByIdReq.request.method).toBe('GET');
    getByIdReq.flush({});
  });
  it('should send a GET request when calling filterExercises', () => {
    repoExerciseService.filterExercises('test', 'test').subscribe(() => {});

    const fitlerExercisesReq = httpMock.expectOne(
      'http://localhost:3333/exercises/filter?key=test&value=test'
    );
    expect(fitlerExercisesReq.request.method).toBe('GET');
    fitlerExercisesReq.flush({});
  });
  it('should handle error in create', () => {
    repoExerciseService.create(mockExerciseFormData).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe('test');
      },
    });

    const registerReq = httpMock.expectOne('http://localhost:3333/exercises');
    expect(registerReq.request.method).toBe('POST');
    registerReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });

  it('should handle error in getAll', () => {
    repoExerciseService.getAll().subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(401);
      },
    });

    const getAllReq = httpMock.expectOne('http://localhost:3333/exercises');
    expect(getAllReq.request.method).toBe('GET');
    getAllReq.flush(
      { message: 'test' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });
  it('should handle error in getById', () => {
    repoExerciseService.getById('test').subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe('test');
      },
    });

    const registerReq = httpMock.expectOne(
      'http://localhost:3333/exercises/test'
    );
    expect(registerReq.request.method).toBe('GET');
    registerReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
  it('should handle error in getById', () => {
    repoExerciseService.filterExercises('test', 'test').subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('test');
      },
    });

    const filterExercisesReq = httpMock.expectOne(
      'http://localhost:3333/exercises/filter?key=test&value=test'
    );
    expect(filterExercisesReq.request.method).toBe('GET');
    filterExercisesReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
});
