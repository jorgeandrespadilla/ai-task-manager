import { EncodingUtils } from "./encoding";
import { JsonUtils } from "./json";

export class LocalStorageUtils {

  public static load<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data
      ? JsonUtils.tryDeserialize<T>(EncodingUtils.base64Decode(data))
      : null;
  }

  public static save<T>(key: string, data: T): void {
    const json = JsonUtils.trySerialize(data);
    if (!json) {
      throw new Error("Failed to serialize data to JSON");
    }
    localStorage.setItem(key, EncodingUtils.base64Encode(json));
  }

  public static remove(key: string): void {
    localStorage.removeItem(key);
  }

  public static clear(): void {
    localStorage.clear();
  }

}

