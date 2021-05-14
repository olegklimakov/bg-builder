import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationLinkComponent } from './donation-link.component';

describe('DonationLinkComponent', () => {
  let component: DonationLinkComponent;
  let fixture: ComponentFixture<DonationLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
