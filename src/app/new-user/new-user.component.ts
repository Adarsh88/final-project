import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  formData: FormGroup;
  userSubmited: Boolean;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  // validations of form

  createRegForm() {
    this.formData = this.fb.group({
      id: [null, [Validators.required, Validators.maxLength(6)]],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      gender: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.createRegForm();

    let draft = window.localStorage.getItem('step');
    console.log(draft);
    if (draft) {
      console.log(this.formData);
      this.formData.setValue(JSON.parse(draft));
    }

    this.formData.valueChanges
      .pipe(filter(() => this.formData.valid))
      .subscribe((val) =>
        window.localStorage.setItem('step', JSON.stringify(val))
      );
  }
  // post data

  onSubmit(data: any) {
    // for posting the data to custom endpoint
    // console.log(data);
    this.http.post('http://localhost:4200/public', data);

    // for resetting the form data after submission
    this.userSubmited = true;
    if (this.formData.valid) {
      this.userSubmited = false;
      this.formData.reset();
    }
  }

  // getter methods for form control

  get id() {
    return this.formData.get('id') as FormControl;
  }
  get name() {
    return this.formData.get('name') as FormControl;
  }
  get email() {
    return this.formData.get('email') as FormControl;
  }
  get gender() {
    return this.formData.get('gender') as FormControl;
  }
  get status() {
    return this.formData.get('status') as FormControl;
  }
}
