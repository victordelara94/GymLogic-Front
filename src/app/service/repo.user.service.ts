import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Routine } from 'src/model/routine.type';
import { Logged, Login, User } from 'src/model/user.type';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class RepoUserService {
  url: string;
  token = '';
  constructor(private http: HttpClient, private stateService: StateService) {
    this.url = 'http://localhost:3333/users';
    this.stateService.state$.subscribe((state) => {
      if (!state.actualUser) {
        this.token = '';
        return;
      }
      this.token = state.actualUser?.token!;
    });
  }

  create(data: Omit<User, 'id'>): Observable<User> {
    const url = this.url + '/register';
    const response = this.http
      .post<User>(url, data)
      .pipe(catchError((error) => throwError(() => error.error)));
    return response;
  }
  login(data: Login): Observable<Logged> {
    const url = this.url + '/login';
    const response = this.http.patch<Logged>(url, data);
    response.pipe(catchError((error) => throwError(() => error.error.message)));

    return response;
  }
  getAll(): Observable<User[]> {
    const url = this.url;
    const response = this.http
      .get<User[]>(url, {
        headers: { ['Authorization']: `Bearer ${this.token}` },
      })
      .pipe(catchError((error) => throwError(() => error)));

    return response;
  }
  getById(id: User['id']) {
    const url = this.url + `/${id}`;
    const response = this.http
      .get<User>(url, {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError((error) => throwError(() => error.error.message)));
    return response;
  }
  addActualRoutine(routine: Routine['id']): Observable<User> {
    const response = this.http
      .patch<User>(
        this.url,
        { actualRoutine: routine },
        {
          headers: {
            ['Authorization']: `Bearer ${this.token}`,
          },
        }
      )
      .pipe(catchError((error) => throwError(() => error.error)));
    return response;
  }
}
