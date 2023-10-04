import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/service/state.service';
import { Logged } from 'src/model/user.type';

@Component({
  selector: 'GymLogic-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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
}
