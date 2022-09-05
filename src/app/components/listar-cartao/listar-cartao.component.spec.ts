import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCartaoComponent } from './listar-cartao.component';

describe('ListarCartaoComponent', () => {
  let component: ListarCartaoComponent;
  let fixture: ComponentFixture<ListarCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
