import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { User } from '../domain';
import { Auth } from '../domain/auth.model';

@Injectable()
export class AuthService {
  private readonly domain = 'users';
  private headers = new Headers({
    'Content-type': 'application/json'
  });
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'email': user.email}})
      .switchMap(res => {
        if (res.json().length > 0) {
          throw new Error('user excited');
        }
        return this.http
          .post(uri, JSON.stringify(user), {headers: this.headers})
          .map(r => ({token: this.token, user: r.json()}));
      });
  }
  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    console.log('login start')
    return this.http
      .get(uri, {params: {'email': username, 'password': password}})
      .map(res => {
        if (res.json().length === 0) {
          throw new Error('username or password not match');
        }
        return {
          token: this.token,
          user: res.json()[0]
        };
      });
  }
}
