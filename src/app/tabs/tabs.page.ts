import { Component } from '@angular/core';
import { TranslateFilesService } from '../services/translate-files.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  selectedLanguage: string;

  constructor(private Translate: TranslateFilesService) {
    this.selectedLanguage = this.Translate.getDefaultLanguage();
  }
  languageChanged() {
    this.Translate.setLanguage(this.selectedLanguage);
  }
}
