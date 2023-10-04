import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/home/home.component';
import { StateService } from 'src/app/service/state.service';
import { mockStateService } from '../../../mock/mock.spec';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: StateService, useValue: mockStateService }],
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: HomeComponent,
          },
        ]),
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('handleClick', () => {
    spyOn(mockStateService, 'logout').and.callThrough();
    component.handleClick();
    expect(mockStateService.logout).toHaveBeenCalled();
  });
});
