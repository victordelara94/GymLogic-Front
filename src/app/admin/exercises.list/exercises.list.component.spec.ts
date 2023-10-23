import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { RepoExerciseService } from 'src/app/service/repo.exercise.service';
import { mockExercises } from 'src/mock/mock.spec';
import { ExercisesListComponent } from './exercises.list.component';

describe('ExercisesListComponent', () => {
  let component: ExercisesListComponent;
  let fixture: ComponentFixture<ExercisesListComponent>;
  let isOpen: EventEmitter<boolean>;
  let repo: RepoExerciseService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExercisesListComponent],
      providers: [RepoExerciseService],
      imports: [HttpClientTestingModule],
    });
    repo = TestBed.inject(RepoExerciseService);
    spyOn(repo, 'getAll').and.returnValue(of(mockExercises));
    fixture = TestBed.createComponent(ExercisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('searchExercises called with key=name', () => {
    const event = new Event('submit');
    spyOn(repo, 'filterExercises').and.returnValue(of(mockExercises));
    component.searchExercises(event, 'name', 'test');
    expect(repo.filterExercises).toHaveBeenCalledWith('name', 'test');
  });
  it('searchExercises called with key=muscle', () => {
    spyOn(repo, 'filterExercises').and.returnValue(of(mockExercises));
    const event = new Event('submit');
    component.searchExercises(event, 'muscle', 'test');
    expect(repo.filterExercises).toHaveBeenCalledWith('muscle', 'test');
  });
  it('searchExercises called with empty key', () => {
    const event = new Event('submit');
    component.searchExercises(event, '', 'test');
    expect(repo.getAll).toHaveBeenCalledWith();
  });
  it('emitEventValue', () => {
    spyOn(component.isOpen, 'emit').and.callThrough();
    component.emitEventValue();
    expect(component.isOpen.emit).toHaveBeenCalledOnceWith(false);
  });
});
