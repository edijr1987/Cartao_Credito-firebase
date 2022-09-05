import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCartaoComponent } from './criar-cartao.component';

describe('CriarCartaoComponent', () => {
  let component: CriarCartaoComponent;
  let fixture: ComponentFixture<CriarCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarCartaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
