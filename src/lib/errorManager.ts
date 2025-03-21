import { getVersion } from '@tauri-apps/api/app';
import { info } from '@tauri-apps/plugin-log';
import { toast } from 'sonner';

interface ErrorManagerConfig {
  dateTimeFormat: Intl.DateTimeFormatOptions;
  enableLogFile: boolean;
  remoteLogEndpoint: string | null;
  enableRemoteLogging: boolean;
  enableConsoleLogging: boolean;
  captureUnhandledErrors: boolean;
  captureRejections: boolean;
  captureReactErrors: boolean;
}

const ERROR_TYPES = {
  RUNTIME: 'RuntimeError',
  DATABASE: 'DatabaseError',
  WEBVIEW: 'WebviewError',
  // APP: 'AppError',
  // WINDOW: 'WindowError',
  // NETWORK: 'NetworkError',
  // PROMISE: 'PromiseError',
  // RENDER: 'RenderError',
  // ROUTER: 'RouterError',
  UNKNOWN: 'UnknownError',
} as const;
type ErrorType = keyof typeof ERROR_TYPES;

enum SeverityLevel {
  CRITICAL = 'critical',
  WARNING = 'warning',
  INFO = 'info',
}

interface NormalizedError {
  message: string | undefined;
  name: string | undefined;
  type: ErrorType;
  severity: SeverityLevel;
  solution?: string | undefined;
  originalError: any;
  timestamp: string;
  additionalInfo?: Record<string, string | number | boolean>;
}

/**
 * ErrorManager - Static class for managing errors across the whole app
 *
 * This class provides methods to capture and handle any type of error that may ocurr in the app (unhandled rejections, console errors, react errros from boundaries, any of the tauri apis, etc...). It behaves according to the config, whether it should log to a file or a remote, and sends errors to the user with helpfull mesagges when it is possible.
 */
class ErrorManager {
  public config: ErrorManagerConfig = {
    enableLogFile: true,
    enableConsoleLogging: true,
    enableRemoteLogging: false,
    captureUnhandledErrors: true,
    captureRejections: true,
    captureReactErrors: true,
    remoteLogEndpoint: null,
    dateTimeFormat: {
      dateStyle: 'short',
      timeStyle: 'medium',
      hour12: false,
    },
  };

  private isInitialized = false;

  // initialize the ErrorManager and set the default config + the one optionally passed
  public initialize(customConfig: Partial<ErrorManagerConfig> = {}): void {
    if (this.isInitialized) return;
    this.config = { ...this.config, ...customConfig };

    window.addEventListener('error', (err) => {
      const { message, filename, lineno, colno, error } = err;

      this.handleError(error || message, {
        type: 'RUNTIME',
        location: `${filename}:${lineno}:${colno}`,
      });
    });

    // if (this.config.captureRejections) {
    //   window.addEventListener('unhandledrejection', (event) => {
    //     const { reason } = event;

    //     this.handleError(reason, {
    //       type: errorTypes.PROMISE,
    //     });
    //   });
    // }

    this.isInitialized = true;
    info('Error manager initialized');
  }

  public async handleError(
    error: any,
    additionalInfo: Record<string, string | number | boolean> = {},
  ): Promise<void> {
    if (!this.isInitialized) {
      this.initialize();
    }

    const base = await this._normalizeError(error, additionalInfo);

    if (this.config.enableConsoleLogging) {
      console.error(base);
    }

    if (this.config.enableRemoteLogging) {
      this._sendToRemote(base);
    }

    if (base.severity === SeverityLevel.CRITICAL) {
      toast.error('an error has ocurred', {
        description: base.message,
      });
    } else if (base.severity === SeverityLevel.WARNING) {
      toast.warning('uh oh', {
        description: base.message,
      });
    } else {
      toast.info(base.message);
    }
  }

  private async _normalizeError(
    error: any,
    additionalInfo: Record<string, any> = {},
  ): Promise<NormalizedError> {
    const normalized: NormalizedError = {
      message: error.message || String(error),
      name: error.name || additionalInfo.type || String(error),
      type: this._inferErrorType(error, additionalInfo),
      severity: SeverityLevel.CRITICAL,
      originalError: error,
      timestamp: new Intl.DateTimeFormat(
        'en-US',
        this.config.dateTimeFormat,
      ).format(new Date()),
      additionalInfo: { ...additionalInfo },
    };

    return normalized;
  }

  private _inferErrorType(
    error: any,
    additionalInfo: Record<string, string | number | boolean>,
  ): ErrorType {
    if ('type' in additionalInfo) return additionalInfo.type as ErrorType;

    // check if the error.name is already "DatabaseError" or any other ErrorType
    if (Object.values(ERROR_TYPES).includes(error.name))
      return error.name as ErrorType;

    if (error instanceof Error) {
      if (error.message.includes('zoom')) {
        return 'WEBVIEW';
      }

      if (
        error.name === 'DatabaseError' ||
        error.message.includes('database') ||
        error.message.includes('parameter')
      ) {
        return 'DATABASE';
      }

      if (
        error instanceof TypeError &&
        (error.message.includes('undefined is not a function') ||
          error.message.includes('cannot read property'))
      ) {
        return 'RUNTIME';
      }
    }

    return 'UNKNOWN';
  }

  private async _sendToRemote(base: NormalizedError): Promise<void> {
    console.info(base); // make https call to remote
  }
}

export const errorHandler = new ErrorManager();
