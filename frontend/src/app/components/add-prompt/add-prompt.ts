import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../../services/prompt.service';

@Component({
  selector: 'app-add-prompt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-prompt.html',
  styleUrls: ['./add-prompt.css']
})
export class AddPromptComponent {

  // 🔥 EMIT EVENTS TO PARENT
  @Output() close = new EventEmitter<void>();
  @Output() added = new EventEmitter<void>();

  // 🔥 FORM STATE
  newPrompt = {
    title: '',
    content: ''
  };

  constructor(private service: PromptService) {}

  // 🔥 CLOSE MODAL
  closeAddModal() {
    this.close.emit();
  }

  // 🔥 ADD PROMPT
  addPrompt() {
    if (!this.newPrompt.title.trim() || !this.newPrompt.content.trim()) return;

    this.service.addPrompt(this.newPrompt).subscribe({
      next: () => {
        this.newPrompt = { title: '', content: '' };

        // notify parent
        this.added.emit();

        this.closeAddModal();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add prompt');
      }
    });
  }
}