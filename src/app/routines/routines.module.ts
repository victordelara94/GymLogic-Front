import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from './card/card.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { RoutinesRoutingModule } from './routines-routing.module';

@NgModule({
  declarations: [ListComponent, CardComponent, DetailsComponent],
  imports: [CommonModule, RoutinesRoutingModule, MatIconModule],
  exports: [ListComponent],
})
export class RoutinesModule {}
