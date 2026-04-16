import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PromptService } from '../../services/prompt.service';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prompt-detail.html',
})
export class PromptDetailComponent implements OnInit {

  prompt: any = null;

  // ✅ ADD THESE (missing properties)
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: PromptService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getPrompt(id).subscribe({
      next: (data: any) => {
        this.prompt = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('API ERROR:', err);
        this.error = 'Failed to load prompt';
        this.loading = false;
      }
    });
  }
}