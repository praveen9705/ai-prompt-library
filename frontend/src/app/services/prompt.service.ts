import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  apiUrl = 'http://127.0.0.1:8000/prompts/';

  constructor(private http: HttpClient) {}

  // GET ALL
  getPrompts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // GET ONE
  getPrompt(id: number) {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  // ADD
  addPrompt(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  // TRENDING
  getTrending() {
    return this.http.get<any[]>(`${this.apiUrl}trending/`);
  }
}