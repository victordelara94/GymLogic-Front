import { TestBed } from '@angular/core/testing';
import {
  mockLogged,
  mockRoutine,
  mockRoutines,
  mockUsers,
} from '../../mock/mock.spec';
import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('login', () => {
    const spyState = spyOn(service.state$, 'next').and.callThrough();
    service.login(mockLogged);
    expect(spyState).toHaveBeenCalled();
  });
  it('logout', () => {
    const spyState = spyOn(service.state$, 'next').and.callThrough();
    service.logout();
    expect(spyState).toHaveBeenCalled();
  });
  it('setUsers', () => {
    const spyState = spyOn(service.state$, 'next').and.callThrough();
    service.setUsers(mockUsers);
    expect(spyState).toHaveBeenCalled();
  });
  it('setRoutines', () => {
    const spyState = spyOn(service.state$, 'next').and.callThrough();
    service.setRoutines(mockRoutines);
    expect(spyState).toHaveBeenCalled();
  });
  it('deleteRoutine', () => {
    service.state$.next({ ...service.state$.value, routines: mockRoutines });

    service.deleteRoutine('test');
    expect(service).toBeTruthy();
  });
  it('setActualRoutine', () => {
    const spyState = spyOn(service.state$, 'next').and.callThrough();

    service.setActualRoutine(mockRoutine);
    expect(spyState).toHaveBeenCalled();
  });
});
