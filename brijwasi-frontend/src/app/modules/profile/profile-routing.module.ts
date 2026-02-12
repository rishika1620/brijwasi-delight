import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { PaymentCardsComponent } from './components/payment-cards/payment-cards.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: ProfileComponent,
        data: { title: 'Profile Overview' }
      },
      {
        path: 'addresses',
        component: AddressesComponent,
        data: { title: 'My Addresses' }
      },
      {
        path: 'payment-methods',
        component: PaymentCardsComponent,
        data: { title: 'Payment Methods' }
      },
      {
        path: 'preferences',
        component: PreferencesComponent,
        data: { title: 'My Preferences' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
