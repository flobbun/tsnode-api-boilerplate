import { LogTypes, LogTypesEnum } from "../../constants/logTypes.enum";

class LogsService {
  log(str: string, logType: LogTypes = 'info'): void {
    const logMessage = typeof str !== 'string' ? JSON.stringify(str) : str;

    const logTypes = {
      // By severity
      [LogTypesEnum.WARN]: `\x1b[34m${logMessage}\x1b[0m`,
      [LogTypesEnum.ERROR]: `\x1b[31m${logMessage}\x1b[0m`,
      [LogTypesEnum.INFO]: `\x1b[32m${logMessage}\x1b[0m`,
      [LogTypesEnum.DEBUG]: `\x1b[34m${logMessage}\x1b[0m`,
    };
    console.log(logTypes[logType]);
  }
}

const logsService = new LogsService();

export {logsService as LogsService};
