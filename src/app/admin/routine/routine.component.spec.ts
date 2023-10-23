import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { StateService } from 'src/app/service/state.service';
import { mockRoutine } from 'src/mock/mock.spec';
import { AdminHomeComponent } from '../admin.home/admin.home.component';
import { RoutineComponent } from './routine.component';

describe('RoutineComponent', () => {
  let component: RoutineComponent;
  let fixture: ComponentFixture<RoutineComponent>;
  let repo: RepoRoutineService;
  let state: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineComponent],
      providers: [RepoRoutineService, StateService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'adminHome', component: AdminHomeComponent },
        ]),
      ],
    });
    fixture = TestBed.createComponent(RoutineComponent);
    repo = TestBed.inject(RepoRoutineService);
    state = TestBed.inject(StateService);
    const spyRepo = spyOn(repo, 'getById');
    spyRepo.and.returnValue(of(mockRoutine));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit', () => {
    expect(repo.getById).toHaveBeenCalled();
  });
  it('openModal', () => {
    spyOn(state, 'setDay');
    component.openModal(5);
    expect(state.setDay).toHaveBeenCalledWith(5);
    expect(component.isOpen).toBe(true);
  });
  it('closeModal', () => {
    component.closeModal(false);
    expect(component.isOpen).toBe(false);
  });
});
