import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Constants from './constants';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class Rest {
  constructor(private httpClient: HttpClient) {
  }

  public credential(params){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.httpClient.put(
      Constants.apiserver+'credential',
      params,
      httpOptions
    );
  }

  public message(params : any, key : any, shared_secret : any){
    var xroute = "message";

    var query = "msg/"+params.msg+";tags/"+params.tags+";"+xroute;
    query = query.split(";").sort().join(";");
    var signature = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(CryptoJS.enc.Utf8.parse(query),
      CryptoJS.enc.Utf8.parse(shared_secret))
    );

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Key':  key,
        'X-Route':  xroute,
        'X-Signature':  signature
      })
    };
    return this.httpClient.post(
      Constants.apiserver+'message',
      params,
      httpOptions
    );
  }

  public message_id(params : any, key : any, shared_secret : any){
    var xroute = "message_id";

    var query = "id/"+params.id+";"+xroute;
    query = query.split(";").sort().join(";");
    var signature = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(CryptoJS.enc.Utf8.parse(query),
      CryptoJS.enc.Utf8.parse(shared_secret))
    );

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Key':  key,
        'X-Route':  xroute,
        'X-Signature':  signature
      })
    };

    return this.httpClient.get(
      Constants.apiserver+'message/id/'+params.id,
      httpOptions
    );
  }

  public message_tag(params : any, key : any, shared_secret : any){
    var xroute = "message_tag";

    var query = "tag/"+params.tag+";"+xroute;
    query = query.split(";").sort().join(";");
    var signature = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(CryptoJS.enc.Utf8.parse(query),
      CryptoJS.enc.Utf8.parse(shared_secret))
    );

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Key':  key,
        'X-Route':  xroute,
        'X-Signature':  signature
      })
    };

    return this.httpClient.get(
      Constants.apiserver+'message/tag/'+params.tag,
      httpOptions
    );
  }

}
