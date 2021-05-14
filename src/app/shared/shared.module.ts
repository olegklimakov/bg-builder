import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationsComponent } from './donations/donations.component';
import { DonationLinkComponent } from './donations/donation-link/donation-link.component';



@NgModule({
  declarations: [
    DonationsComponent,
    DonationLinkComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DonationsComponent
  ]
})
export class SharedModule { }
