import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RepoExerciseService } from './repo.exercise.service';

import { mockExerciseFormData } from '../../mock/mock.spec';
describe('RepoExerciseService', () => {
  let repoExerciseService: RepoExerciseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoExerciseService],
    });
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

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/exercises'
    );
    expect(createReq.request.method).toBe('POST');
    createReq.flush({});
  });

  it('should send a GET request when calling getAll', () => {
    repoExerciseService.getAll().subscribe(() => {});

    const getAllReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/exercises'
    );
    expect(getAllReq.request.method).toBe('GET');
    getAllReq.flush({});
  });
  it('should send a GET request when calling getById', () => {
    repoExerciseService.getById('test').subscribe(() => {});

    const getByIdReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/exercises/test'
    );
    expect(getByIdReq.request.method).toBe('GET');
    getByIdReq.flush({});
  });
  it('should handle error in create', () => {
    repoExerciseService.create(mockExerciseFormData).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe('test');
      },
    });

    const registerReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/exercises'
    );
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

    const getAllReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/exercises'
    );
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
      'https://gymlogic-back.onrender.com/exercises/test'
    );
    expect(registerReq.request.method).toBe('GET');
    registerReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
});
