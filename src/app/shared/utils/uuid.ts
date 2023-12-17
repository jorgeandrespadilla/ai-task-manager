import { v4 as uuidv4 } from 'uuid';

export class UUID {

  static generate(): string {
    return uuidv4();
  }

  static generateWithoutDash(): string {
    return uuidv4().replace(/-/g, '');
  }

}
