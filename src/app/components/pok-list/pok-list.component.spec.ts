import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokListComponent } from './pok-list.component';

describe('PokListComponent', () => {
  let component: PokListComponent;
  let fixture: ComponentFixture<PokListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
