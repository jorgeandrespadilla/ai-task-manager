import { VIEWPORT_BREAKPOINTS } from "../constants/viewport";
import { Viewport } from "../enums/viewport.enum";

export class ViewportUtils {

  /**
   * Validate if the current viewport is above the given viewport breakpoint (inclusive).
   * @param viewport The viewport to validate.
   */
  public static isViewportAbove(viewport: Viewport): boolean {
    return window.innerWidth >= VIEWPORT_BREAKPOINTS[viewport];
  }

  /**
   * Validate if the current viewport is below the given viewport breakpoint (exclusive).
   * @param viewport The viewport to validate.
   */
  public static isViewportBelow(viewport: Viewport): boolean {
    return window.innerWidth < VIEWPORT_BREAKPOINTS[viewport];
  }

}

