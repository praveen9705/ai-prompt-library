import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../../services/prompt.service';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prompt-list.html',
  styleUrls: ['./prompt-list.css']
})
export class PromptListComponent implements OnInit {

  // DATA
  prompts: any[] = [];
  trending: any[] = [];

  // UI STATES
  loading = true;
  error = '';

  // MODALS
  selectedPrompt: any = null;
  showAddModal = false;

  // FORM
  newPrompt = {
    title: '',
    content: ''
  };

  constructor(private service: PromptService) {}

  ngOnInit() {
  this.service.getPrompts().subscribe({
    next: (res: any) => {
      console.log('API:', res);

      // 🔥 SAFE PARSE
      this.prompts = Array.isArray(res) ? res : [];

    },
    error: (err) => {
      console.error('ERROR:', err);
      this.prompts = [];
    }
  });
}
  // LOAD ALL
  loadPrompts() {
  this.service.getPrompts().subscribe({
    next: (res) => {
      console.log('API DATA:', res);   // 👈 STEP 5 (THIS LINE)
      this.prompts = res;
    },
    error: (err) => {
      console.error('API ERROR:', err); // 👈 ALSO ADD THIS
    }
  });
}

  // LOAD TRENDING
  loadTrending() {
    this.service.getTrending().subscribe({
      next: (data: any[]) => {
        this.trending = data.slice(0, 4);
      },
      error: () => {
        console.error('Trending failed');
      }
    });
  }

  // VIEW
  openPrompt(p: any) {
    this.selectedPrompt = p;
  }

  closeModal() {
    this.selectedPrompt = null;
  }

  // ADD MODAL
  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  // ADD PROMPT
  addPrompt() {
    if (!this.newPrompt.title || !this.newPrompt.content) return;

    this.service.addPrompt(this.newPrompt).subscribe({
      next: (res) => {
        this.prompts.unshift(res);
        this.newPrompt = { title: '', content: '' };
        this.closeAddModal();
      },
      error: () => {
        alert('Failed to add prompt');
      }
    });
  }
}