import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { FullExercise, Routine } from 'src/model/routine.type';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class RepoRoutineService {
  url: string;
  token: string = '';

  constructor(private http: HttpClient, private stateService: StateService) {
    this.url = 'http://localhost:3333/routines';
    this.stateService.state$.subscribe((state) => {
      if (!state.actualUser) {
        this.token = '';
        return;
      }
      this.token = state.actualUser?.token!;
    });
  }
  create(routine: Partial<Routine>): Observable<Routine> {
    const response = this.http
      .post<Routine>(this.url, routine, {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error.error);
        })
      );
    return response;
  }
  getAll(): Observable<Routine[]> {
    const response = this.http
      .get<Routine[]>(this.url, {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError((error) => throwError(() => error.error)));
    return response;
  }
  getById(id: Routine['id']): Observable<Routine> {
    const url = this.url + `/${id}`;
    const response = this.http
      .get<Routine>(url, {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError((error) => throwError(() => error)));
    return response;
  }
  delete(id: Routine['id']): Observable<void> {
    const url = this.url + `/${id}`;
    const response = this.http
      .delete<void>(url, {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError((error) => throwError(() => error)));
    return response;
  }

  addExercise(
    id: Routine['id'],
    day: number,
    fullExercise: FullExercise
  ): Observable<Routine> {
    const url = this.url + `/addExercise/${id}`;
    const response = this.http
      .patch<Routine>(
        url,
        { day, fullExercise },
        {
          headers: {
            ['Authorization']: `Bearer ${this.token}`,
          },
        }
      )
      .pipe(catchError((error) => throwError(() => error)));
    return response;
  }
  filterRoutines(key: string, value: string): Observable<Routine[]> {
    const url = this.url + `/filter?key=${key}&value=${value}`;
    const response = this.http
      .get<Routine[]>(url, {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError((error) => throwError(() => error.error)));
    return response;
  }
  updateRoutine(
    partialRoutine: Partial<Routine>,
    id: Routine['id']
  ): Observable<Routine> {
    const url = this.url + '/' + id;
    const response = this.http
      .patch<Routine>(url, partialRoutine, {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError((error) => throwError(() => error.error)));
    return response;
  }
}
