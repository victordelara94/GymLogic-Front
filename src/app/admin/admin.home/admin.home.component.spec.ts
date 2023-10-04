import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { StateService } from 'src/app/service/state.service';
import { mockRoutineRepo, mockStateService } from 'src/mock/mock.spec';
import { AdminHomeComponent } from './admin.home.component';

describe('AdminHomeComponent', () => {
  let adminHomeComponent: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, CommonModule, RouterTestingModule],
      declarations: [AdminHomeComponent],
      providers: [
        { provide: RepoRoutineService, useValue: mockRoutineRepo },
        { provide: StateService, useValue: mockStateService },
      ],
    });
    fixture = TestBed.createComponent(AdminHomeComponent);
    adminHomeComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(adminHomeComponent).toBeTruthy();
  });
  it('deleteRoutine', () => {
    spyOn(mockRoutineRepo, 'delete').and.returnValue(of(undefined));
    adminHomeComponent.deleteRoutine('test');
    expect(mockRoutineRepo.delete).toHaveBeenCalled;
  });
  it('deleteRoutine', () => {
    spyOn(mockRoutineRepo, 'delete').and.returnValue(throwError(() => {}));
    adminHomeComponent.deleteRoutine('test');
    expect(mockRoutineRepo.delete).toThrowError;
    expect(adminHomeComponent.message).toBe('Error, rutina no encontrada');
  });
});
