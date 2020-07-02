import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTagComponent } from './message-tag.component';

describe('MessageTagComponent', () => {
  let component: MessageTagComponent;
  let fixture: ComponentFixture<MessageTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
