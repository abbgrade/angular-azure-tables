import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { SHA256 } from 'crypto-js';

@Injectable()
export class AzureTableService {

    constructor(private http:Http) {}

    private authenticate(
        method:string,
        headers:Map<string,string>
    ) {
        let contentEncoding:string =    headers.get('Content-Encoding') || '';      headers.delete('Content-Encoding');
        let contentLanguage:string =    headers.get('Content-Language') || '';      headers.delete('Content-Language');
        let contentLength:string =      headers.get('Content-Length') || '';        headers.delete('Content-Length');
        let contentMd5:string =         headers.get('Content-MD5') || '';           headers.delete('Content-MD5');
        let contentType:string =        headers.get('Content-Type') || '';          headers.delete('Content-Type');
        let date:string =               headers.get('Date') || '';                  headers.delete('Date');
        let ifModifiedSince:string =    headers.get('If-Modified-Since') || '';     headers.delete('If-Modified-Since');
        let ifMatch:string =            headers.get('If-Match') || '';              headers.delete('If-Match');
        let ifNoneMatch:string =        headers.get('If-None-Match') || '';         headers.delete('If-None-Match');
        let ifUnmodifiedSince:string =  headers.get('If-Unmodified-Since') || '';   headers.delete('If-Unmodified-Since');
        let range:string =              headers.get('Range') || '';                 headers.delete('Range');

        let canonicalizedHeaders:string = '';
        headers.forEach((value, key) => canonicalizedHeaders += key + ':' + value + '\\n');
        canonicalizedHeaders = canonicalizedHeaders.substring(0, canonicalizedHeaders.length - 2);

        let canonicalizedResource:string = '';

        let signature:string = method.toUpperCase() + "\\n" +
               contentEncoding + "\\n" +  
               contentLanguage + "\\n" +  
               contentLength + "\\n" +  
               contentMd5 + "\\n" +  
               contentType + "\\n" +  
               date + "\\n" +  
               ifModifiedSince + "\\n" +  
               ifMatch + "\\n" +  
               ifNoneMatch + "\\n" +  
               ifUnmodifiedSince + "\\n" +  
               range + "\\n" +  
               canonicalizedHeaders +   
               canonicalizedResource +
        '';

        console.log(signature);

        let hashedSignature:string = SHA256(signature).toString();

        console.log(hashedSignature);

        return hashedSignature;

    }

    private arrayToMap(headers:Headers) {
        let result = new Map<string,string>();
        headers.keys().forEach(key => {
            result.set(key, headers.get(key));
        });
        return result;
    }

    public getTables() {

        let accountName:string = 'devstoreaccount1';
        let host:string = '127.0.0.1:10002';
        let url:string = `http://${ host }/${ accountName }/Tables`;

        let headers = new Headers({
            'x-ms-version': '2015-02-21',
            'x-ms-date': new Date().toUTCString(),
        });

        let signature:string = this.authenticate(
            'get', this.arrayToMap(headers)
        );
        headers.append("Authorization", `SharedKeyLite ${ accountName }:${ signature }`);

        return this.http.get(url, { 'headers': headers })
            .map((res) => res.json());
    }

    public createTable(name:string) {

        // let path = 'http://127.0.0.1:10002/devstoreaccount1/';
        // let body = JSON.stringify({'TableName': name});

        // console.log(`azure:post ${ path } : ${ body }`);

        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new BaseRequestOptions();
        // options.headers = headers;

        // return this.http.post(path, body, options)
        //     .toPromise()
        //     .then(this.extractData)
        //     .catch(this.handleError);

    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}