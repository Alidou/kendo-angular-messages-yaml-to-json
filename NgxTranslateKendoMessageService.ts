import { MessageService } from "@progress/kendo-angular-l10n";
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NgxTranslateKendoMessageService extends MessageService {
    constructor(private readonly translateService: TranslateService) {
        super();
    }

    public override get(key: string): string {
      return this.translateService.instant(key);
    }
}