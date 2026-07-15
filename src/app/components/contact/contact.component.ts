import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'https://api.web3forms.com/submit';
  private readonly accessKey = 'b3f9360a-c218-4599-92af-c4e80763da41';

  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  loading = false;
  statusMessage = '';
  statusType: '' | 'success' | 'error' = '';

  onSubmit(): void {
    if (this.loading) return;

    this.loading = true;
    this.statusMessage = '';
    this.statusType = '';

    const body = new FormData();
    body.append('access_key', this.accessKey);
    body.append('name', this.form.name);
    body.append('email', this.form.email);
    body.append('subject', this.form.subject);
    body.append('message', this.form.message);

    this.http
      .post<{ success?: boolean; message?: string }>(this.endpoint, body, {
        headers: new HttpHeaders({ Accept: 'application/json' })
      })
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.statusMessage = 'Message envoyé avec succès ! Je vous répondrai rapidement.';
            this.statusType = 'success';
            this.form = { name: '', email: '', subject: '', message: '' };
          } else {
            this.statusMessage =
              "Une erreur est survenue. Veuillez réessayer ou m'envoyer un email directement.";
            this.statusType = 'error';
          }
          this.loading = false;
        },
        error: () => {
          this.statusMessage =
            "Une erreur est survenue. Veuillez réessayer ou m'envoyer un email directement.";
          this.statusType = 'error';
          this.loading = false;
        }
      });
  }
}
