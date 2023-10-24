import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { StateService } from 'src/app/service/state.service';
import { Logged } from 'src/model/user.type';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'GymLogic-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(MenuComponent) trigger!: MatMenuTrigger;

  actualUser!: Logged | null;
  constructor(private stateService: StateService, private router: Router) {
    this.stateService.state$.subscribe(
      (data) => (this.actualUser = data.actualUser)
    );
  }
  handleClick() {
    this.stateService.logout();
    this.router.navigateByUrl('home');
  }
  someMethod() {
    this.trigger.openMenu();
  }
  try() {
    console.log('funciona');
  }
}
