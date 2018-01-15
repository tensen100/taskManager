import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuoteService } from '../../service/quote.service';
import { Quote } from '../../domain';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  // quote: Quote;
  quote$: Observable<Quote>;
  constructor(
    private fb: FormBuilder,
    private  quoteService: QuoteService,
    private store$: Store<fromRoot.State> ) {
    this.quote$ = this.store$.select(state => state.quote.quote);
    this.quoteService
      .getQuote()
      .subscribe( q => {
        // this.quote = q;
        this.store$.dispatch({type: actions.QUOTE_SUCCESS, payload: q});
      });
  }

  ngOnInit() {
    /*this.form = new FormGroup({
      email: new FormControl('wang@163.com', Validators.compose([Validators.required]) ),
      password: new FormControl('', Validators.required)
    });*/
    this.form = this.fb.group({
      // email: ['wang@163.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      email: ['wang@163.com', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    // 提交时验证
    this.form.controls['email'].setValidators(this.validate);
    console.log(JSON.stringify(value));
    console.log(valid);
  }
  // 自定义验证器
  validate(c: FormControl): {[key: string]: any} {
    if (!c.value) {
      return null;
    }
    const pattern = /^wang+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'the email must start with wang'
    };
  }

}
