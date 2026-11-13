import { APP_CONFIG } from './compilation-time/APP_CONFIG';
import { EnvProvider } from './runtime/EnvProvider';

export function initalizeConfig() {
  console.log('Starting ' + APP_CONFIG.core.appName + ' ' + APP_CONFIG.core.appVersion);
  EnvProvider.getInstance();
}
