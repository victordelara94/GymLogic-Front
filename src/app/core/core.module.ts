import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HomeRoutingModule } from '../home/home-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, HomeRoutingModule, MatIconModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
