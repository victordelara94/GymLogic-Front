import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StateService } from 'src/app/service/state.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
  providers: [StateService],
  exports: [HomeComponent],
})
export class HomeModule {}
