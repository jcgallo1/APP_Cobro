import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacarCuentasComponent } from './sacar-cuentas.component';

describe('SacarCuentasComponent', () => {
  let component: SacarCuentasComponent;
  let fixture: ComponentFixture<SacarCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SacarCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SacarCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
