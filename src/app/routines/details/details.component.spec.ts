import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { RepoUserService } from 'src/app/service/repo.user.service';

import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { StateService } from 'src/app/service/state.service';
import { mockRoutineRepo, mockUserRepo } from 'src/mock/mock.spec';
import { Routine } from 'src/model/routine.type';
import { State } from 'src/types/state.type';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let state: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatIconModule],
      providers: [
        { provide: RepoRoutineService, useValue: mockRoutineRepo },
        { provide: RepoUserService, useValue: mockUserRepo },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'test' }),
            },
          },
        },
      ],
      declarations: [DetailsComponent],
    });
    state = TestBed.inject(StateService);

    spyOn(state, 'getState').and.returnValue(
      of({
        actualUser: {
          user: { actualRoutine: { routine: { id: 'test' } as Routine } },
        },
      } as unknown as State)
    );
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.id = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('addUserRoutine..', () => {
    component.addUserRoutine();
    expect(component.message).toBe(
      'Rutina añadida a su usuario: ' + component.routine.name
    );
  });
});
