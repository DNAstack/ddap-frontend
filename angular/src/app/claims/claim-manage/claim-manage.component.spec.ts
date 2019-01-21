import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManageComponent } from './claim-manage.component';

describe('ClientManageComponent', () => {
  let component: ClientManageComponent;
  let fixture: ComponentFixture<ClientManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientManageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
