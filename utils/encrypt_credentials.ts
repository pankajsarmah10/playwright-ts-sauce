import * as CryptoJSUtils from "crypto-js";
import * as fs from "fs";

const SALT = process.env.SALT || "2025March";

/**
 * Encrypt a string
 * @param text Encrypt a text
 * @returns Encrypted string
 */
export function encrypt(text: string) {
  const cipherText = CryptoJSUtils.AES.encrypt(text, SALT).toString();
  return cipherText;
}

/**
 * Decrypt a string
 * @param cipherText Text to decrypt
 * @returns Decrypted string
 */
export function decrypt(cipherText: string) {
  const bytes = CryptoJSUtils.AES.decrypt(cipherText, SALT);
  const originalText = bytes.toString(CryptoJSUtils.enc.Utf8);
  return originalText;
}

/**
 * Update config.json with the encrypted username and password
 * @param filePath Path to the config.json
 * @param key Key to update
 * @param newValue Value to update
 */
export function update_credentials_config(
  filePath: string,
  key: string,
  newValue: string
): void {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    jsonData[key] = newValue;
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.log(`Error updating JSON file: ${error}`);
  }
}
