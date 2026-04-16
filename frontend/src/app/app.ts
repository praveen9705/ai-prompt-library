import { Component } from '@angular/core';
import { PromptListComponent } from './components/prompt-list/prompt-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PromptListComponent],
  template: `<app-prompt-list></app-prompt-list>`,
})
export class AppComponent {}