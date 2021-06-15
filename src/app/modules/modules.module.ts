import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomComponent } from '../custom/custom.component';
import { HttpClient } from '@angular/common/http';
import { TranslateFilesService } from '../services/translate-files.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CustomComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [CustomComponent],
})
export class ModulesModule {
  selectedLanguage;
  constructor(
    private http: HttpClient,
    private Translate: TranslateFilesService
  ) {
    this.selectedLanguage = this.Translate.getDefaultLanguage();
  }
  languageChanged() {
    this.Translate.setLanguage(this.selectedLanguage);
  }
}
