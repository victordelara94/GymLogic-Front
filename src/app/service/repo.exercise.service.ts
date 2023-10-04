import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Exercise } from 'src/model/exercise.type';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class RepoExerciseService {
  url: string;
  token: string = '';
  constructor(private http: HttpClient, private stateService: StateService) {
    this.url = 'http://localhost:3333/exercises';
    this.stateService.state$.subscribe((state) => {
      if (!state.actualUser) {
        this.token = '';
        return;
      }
      this.token = state.actualUser?.token!;
    });
  }
  create(exercise: FormData): Observable<Exercise> {
    const response = this.http
      .post<Exercise>(this.url, exercise, {
        headers: { ['Authorization']: `Bearer ${this.token}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
    return response;
  }
  getAll(): Observable<Exercise[]> {
    const response = this.http
      .get<Exercise[]>(this.url, {
        headers: { ['Authorization']: `Bearer ${this.token}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
    return response;
  }
  getById(id: Exercise['id']): Observable<Exercise> {
    const url = this.url + `/${id}`;
    const response = this.http
      .get<Exercise>(url, {
        headers: { ['Authorization']: `Bearer ${this.token}` },
      })
      .pipe(catchError((error) => throwError(() => error)));
    return response;
  }
}
