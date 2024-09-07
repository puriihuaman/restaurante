import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSVGComponent } from './icon-svg.component';

describe('IconSVGComponent', () => {
  let component: IconSVGComponent;
  let fixture: ComponentFixture<IconSVGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconSVGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconSVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
