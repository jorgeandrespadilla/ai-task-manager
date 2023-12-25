import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottieAnimationComponent } from './lottie-animation.component';
import { LottieComponent, LottieModule } from 'ngx-lottie';
import { playerFactory } from '../../utils/lottie';

describe('LottieAnimationComponent', () => {
  let component: LottieAnimationComponent;
  let fixture: ComponentFixture<LottieAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LottieAnimationComponent,
      ],
      imports: [
        LottieComponent,
        LottieModule.forRoot({ player: playerFactory })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LottieAnimationComponent);
    component = fixture.componentInstance;
    component.animation = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
