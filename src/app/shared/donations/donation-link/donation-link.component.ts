import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-donation-link',
  templateUrl: './donation-link.component.html',
  styleUrls: ['./donation-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonationLinkComponent {
  @Input() img: string;
  @Input() link: string;
  @Input() alt: string;
}
