import { LogTypesEnum } from "../constants/logTypes.enum";
import { LogsService } from "../services/http/logs.service";

export default class UserFacingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserFacingError';
        this.message = message;
        LogsService.log(`[${this.name}] ${message}`, LogTypesEnum.WARN);
    }
}