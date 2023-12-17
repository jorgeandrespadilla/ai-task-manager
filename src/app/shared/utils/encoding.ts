export class EncodingUtils {

  public static base64Encode(input: string): string {
    return btoa(input);
  }

  public static base64Decode(input: string): string {
    return atob(input);
  }

}

