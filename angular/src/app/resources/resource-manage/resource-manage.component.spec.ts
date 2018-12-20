import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceManageComponent } from './resource-manage.component';

describe('ResourceManageComponent', () => {
  let component: ResourceManageComponent;
  let fixture: ComponentFixture<ResourceManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
