import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

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
