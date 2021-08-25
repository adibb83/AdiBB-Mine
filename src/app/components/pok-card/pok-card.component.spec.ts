import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokCardComponent } from './pok-card.component';

describe('PokCardComponent', () => {
  let component: PokCardComponent;
  let fixture: ComponentFixture<PokCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
