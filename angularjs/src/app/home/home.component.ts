import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Rest } from '../api/rest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Form: FormGroup;
  submitted = false;
  error = "";
  result = "";

  constructor(
    private formBuilder: FormBuilder,
    private rest: Rest,
    private cookieservice: CookieService
  ) { }

  get f() { return this.Form.controls; }

  ngOnInit() {
    this.Form = this.formBuilder.group({
      key: ['', [Validators.required]],
      shared_secret: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.error = "";
    this.result = "";
    this.submitted = true;
    // stop here if form is invalid
    if (this.Form.invalid) {
        return;
    }

    this.rest.credential(this.Form.value).subscribe((data)=>{
      this.cookieservice.set('shared_secret', this.Form.get('shared_secret').value);
      this.cookieservice.set('key', this.Form.get('key').value);
      this.result = "204 no content";
    }, ( error : HttpErrorResponse)=>{
      if (error.status == 403) {
        this.result = "403 forbidden";
      }else if( error.status == 400 ){
        this.result = "400 bad request";
      }
    });

    // display form values on success

  }

}
