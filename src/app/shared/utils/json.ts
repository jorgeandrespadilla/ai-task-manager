export class JsonUtils {

  public static tryDeserialize<T>(json: string): T | null {
    try {
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  public static trySerialize<T>(data: T): string | null {
    try {
      return JSON.stringify(data);
    } catch (e) {
      return null;
    }
  }

}
