import { async, TestBed } from '@angular/core/testing';
import { ItemModule } from './item.module';

describe('ItemModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ItemModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ItemModule).toBeDefined();
  });
});
