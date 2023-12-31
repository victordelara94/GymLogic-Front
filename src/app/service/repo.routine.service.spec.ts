import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockExercise, mockRoutine } from '../../mock/mock.spec';
import { RepoRoutineService } from './repo.routine.service';

describe('RepoRoutineService', () => {
  let repoRoutineService: RepoRoutineService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoRoutineService],
    });
    repoRoutineService = TestBed.inject(RepoRoutineService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repoRoutineService).toBeTruthy();
  });
  it('should send a POST request when calling create', () => {
    repoRoutineService.create(mockRoutine).subscribe(() => {});

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines'
    );
    expect(createReq.request.method).toBe('POST');
    createReq.flush({});
  });
  it('should send a GET request when calling getAll', () => {
    repoRoutineService.getAll().subscribe(() => {});

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines'
    );
    expect(createReq.request.method).toBe('GET');
    createReq.flush({});
  });
  it('should send a GET request when calling getById', () => {
    repoRoutineService.getById('test').subscribe(() => {});

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines/test'
    );
    expect(createReq.request.method).toBe('GET');
    createReq.flush({});
  });
  it('should send a GET request when calling getAll', () => {
    repoRoutineService.filterRoutines('test', 'test').subscribe(() => {});

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines/filter?key=test&value=test'
    );
    expect(createReq.request.method).toBe('GET');
    createReq.flush({});
  });
  it('should send a DELETE request when calling delete', () => {
    repoRoutineService.delete('test').subscribe(() => {});

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines/test'
    );
    expect(createReq.request.method).toBe('DELETE');
    createReq.flush({});
  });
  it('should send a PATCH request when calling addExercise', () => {
    repoRoutineService.addExercise('test', mockExercise).subscribe(() => {});

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines/test'
    );
    expect(createReq.request.method).toBe('PATCH');
    createReq.flush({});
  });
  it('should handle error in create', () => {
    repoRoutineService.create(mockRoutine).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('test');
      },
    });

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines'
    );
    expect(createReq.request.method).toBe('POST');
    createReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
  it('should handle error in getAll', () => {
    repoRoutineService.getAll().subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('test');
      },
    });

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines'
    );
    expect(createReq.request.method).toBe('GET');
    createReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
  it('should handle error in getById', () => {
    repoRoutineService.getById('test').subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe('test');
      },
    });

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines/test'
    );
    expect(createReq.request.method).toBe('GET');
    createReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
  it('should handle error in delete', () => {
    repoRoutineService.delete('test').subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe('test');
      },
    });

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines/test'
    );
    expect(createReq.request.method).toBe('DELETE');
    createReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
  it('should handle error in addExercise', () => {
    repoRoutineService.addExercise('test', mockExercise).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe('test');
      },
    });

    const createReq = httpMock.expectOne(
      'https://gymlogic-back.onrender.com/routines/test'
    );
    expect(createReq.request.method).toBe('PATCH');
    createReq.flush(
      { message: 'test' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
});
