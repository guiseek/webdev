import { async, TestBed } from '@angular/core/testing';
import { FeatureShellModule } from './feature-shell.module';

describe('FeatureShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureShellModule).toBeDefined();
  });
});
