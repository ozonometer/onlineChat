import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHomeComponent } from './message-home.component';

describe('MessageHomeComponent', () => {
  let component: MessageHomeComponent;
  let fixture: ComponentFixture<MessageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
