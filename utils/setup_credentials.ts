/**
 * Utility to encrypt credentials
 * This file may not be pushed to the github repository and can be used locally.
 * This file can be added to .gitignore
 */

import { encrypt, update_credentials_config } from "./encrypt_credentials";

const config_file_path = "config/config.json";
const email = encrypt("standard_user");
const password = encrypt("secret_sauce");
update_credentials_config(config_file_path, "username", email);
update_credentials_config(config_file_path, "password", password);
