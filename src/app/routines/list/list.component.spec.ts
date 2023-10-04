import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RepoRoutineService } from 'src/app/service/repo.routine.service';
import { StateService } from 'src/app/service/state.service';
import { mockRoutineRepo, mockStateService } from 'src/mock/mock.spec';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let listComponent: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListComponent],
      providers: [
        { provide: RepoRoutineService, useValue: mockRoutineRepo },
        { provide: StateService, useValue: mockStateService },
      ],
    });
    fixture = TestBed.createComponent(ListComponent);
    listComponent = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(listComponent).toBeTruthy();
  });
  it('filteredRoutines...', () => {
    const mockFilterEvent = { target: { value: 'test' } } as unknown as Event;
    listComponent.filterRoutines(mockFilterEvent);
    expect(listComponent).toBeTruthy();
  });
  it('filteredRoutines with event target value = todos', () => {
    const mockFilterEvent = { target: { value: 'todos' } } as unknown as Event;
    listComponent.filterRoutines(mockFilterEvent);
    expect(listComponent).toBeTruthy();
  });
});
