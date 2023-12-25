import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie-animation',
  templateUrl: './lottie-animation.component.html',
  styleUrl: './lottie-animation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LottieAnimationComponent {

  @Input({required: true})
  /**
   * The path to the Lottie json file to be loaded.
   */
  animation!: string;

  @Input()
  loop = true;

  get options(): AnimationOptions {
    return {
      path: this.animation,
      loop: this.loop,
    };
  }

}
