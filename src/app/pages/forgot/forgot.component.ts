import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  form!: FormGroup;
  clas = "";
  message = "";
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ''
     });
  }

  submit(): void {
  this.http.post('/api/forgot', this.form.getRawValue(), { withCredentials: true })
    .subscribe({
      next: () => {
        this.clas = 'success';
        this.message = 'Email was sent!';
      },
      error: (error) => {
        this.clas = 'danger';
        this.message = 'Email not sent: ' + error.message;
      },
    });
}

}
