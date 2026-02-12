import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ButtonComponent } from './components/button.component';
import { CardComponent } from './components/card.component';
import { ModalComponent } from './components/modal.component';
import { LoaderComponent } from './components/loader.component';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';

const COMPONENTS = [
  ButtonComponent,
  CardComponent,
  ModalComponent,
  LoaderComponent,
  NavbarComponent,
  FooterComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [...COMPONENTS, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
