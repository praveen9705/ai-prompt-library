import { Routes } from '@angular/router';
import { PromptListComponent } from './components/prompt-list/prompt-list';
import { PromptDetailComponent } from './components/prompt-detail/prompt-detail';

export const routes: Routes = [
  {
    path: '',
    component: PromptListComponent,
    title: 'Explore Prompts'
  },
  {
    path: 'prompt/:id',
    component: PromptDetailComponent,
    title: 'Prompt Detail'
  },

  // 🔥 fallback (important for production)
  {
    path: '**',
    redirectTo: ''
  }
];