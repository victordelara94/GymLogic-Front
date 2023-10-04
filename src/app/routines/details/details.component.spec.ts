import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { RepoUserService } from 'src/app/service/repo.user.service';

import { mockRoutineRepo, mockUserRepo } from 'src/mock/mock.spec';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
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
