import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Rest } from '../api/rest';

@Component({
  selector: 'app-message-tag',
  templateUrl: './message-tag.component.html',
  styleUrls: ['./message-tag.component.scss']
})
export class MessageTagComponent implements OnInit {
  Form: FormGroup;
  submitted = false;
  error = "";
  result = "";
  data : any;

  constructor(
    private formBuilder: FormBuilder,
    private rest: Rest,
    private cookieservice: CookieService
  ) { }

  get f() { return this.Form.controls; }

  ngOnInit() {
    this.Form = this.formBuilder.group({
      tag: ['', [Validators.required]]
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

    var key = this.cookieservice.get('key');
    var shared_secret = this.cookieservice.get('shared_secret');

    this.rest.message_tag(this.Form.value, key, shared_secret).subscribe((data)=>{
      this.result = "200 ok";
      this.data = data['data'];
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
