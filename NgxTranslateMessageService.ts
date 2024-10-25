import { MessageService } from "@progress/kendo-angular-l10n";
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NgxTranslateMessageService extends MessageService {
    constructor(private readonly translateService: TranslateService) {
        super();
    }

    public override get(key: string): string | undefined {
        let overridedKey = 'overrides.' + key;
        let result = this.translateService.instant([key, overridedKey]);
        if (result[overridedKey] != overridedKey && 
            result[overridedKey] != undefined) {
            return result[overridedKey];
        }

        if (result[key] == key || !result[key]) {
            console.log('translation not found', key);
            return undefined;
        }
        return result[key];
    }
}