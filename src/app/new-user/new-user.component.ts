import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  formData: FormGroup;
  userSubmited: Boolean;
  private POST_API_URL = environment.POST_API_URL;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.createRegForm();
    // for keeping form data intact
    let draft = window.localStorage.getItem('step');
    console.log(draft);
    let newDraft: any = {};
    if (draft) {
      newDraft = JSON.parse(draft);
      console.log(this.formData);
      if (newDraft['status'] !== null) {
        let status = newDraft['status'] === 'Active' ? true : false;
        newDraft = { ...newDraft, status: status };
      } else {
        newDraft = { ...newDraft, status: 'NotActive' };
      }
      this.formData.setValue(newDraft);
    }

    this.formData.valueChanges
      .pipe(filter(() => this.formData.valid))
      .subscribe((val) => {
        val = this.updateActiveStatus(val);
        window.localStorage.setItem('step', JSON.stringify(val));
      });
  }
  // for updating active status
  updateActiveStatus(value: any) {
    if (value['status'] !== null) {
      let status = value['status'] === true ? 'Active' : 'NotActive';
      let newData: any = { ...value, status: status };
      console.log({ newData });
      value = { ...newData };
    } else {
      value = { ...value, status: 'NotActive' };
    }
    return value;
  }
  // creating form validators
  createRegForm() {
    this.formData = this.fb.group({
      id: [null, [Validators.required, Validators.maxLength(6)]],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      gender: [null, Validators.required],
      status: [null],
    });
  }
  onSubmit(data: any) {
    // for posting the data to custom endpoint
    data = this.updateActiveStatus(data);
    this.http.post(this.POST_API_URL, data).subscribe((response: any) => {
      console.log(response);
    });

    // for checking whether user has entered all text before submitting
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
