import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Identity, IdentityType} from '../../domain';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => IdentityInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef( () => IdentityInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityInputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  identityTypes = [
    {
      vslue: IdentityType.IdCard,
      label: '身份证'
    },
    {
      vslue: IdentityType.Insurance,
      label: '医保'
    },
    {
      vslue: IdentityType.Passport,
      label: '护照'
    },
    {
      vslue: IdentityType.Military,
      label: '军官证'
    },
    {
      vslue: IdentityType.Other,
      label: '其他'
    }
  ];
  identity: Identity = {identityType: null, identityNo: null};
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  private sub: Subscription;
  private propagateChange = (_: any) => {};

  constructor() { }
  ngOnInit() {
    const val$ = Observable.combineLatest(this.idNo, this.idType, (_id, _type) => {
      return {
        identityType: _type,
        identityNo: _id
      };
    });
    this.sub = val$.subscribe(id => {
      this.propagateChange(id);
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }
  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }
  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }
  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }
  writeValue(obj: any): void {
    if (obj) {
      this.identity = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    switch (val.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdNumber(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }
  private validateIdNumber(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return {
        idNotValid:  true
      };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    let result = false;
    if (pattern.test(val)) {
      // const info = extractInfo(val);
      // if (isValidAddr(info.addrCode) && isValidDate(info.dateOfBirth)) {
      //   result = true;
      // }
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  private validatePassport(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    if (value.length !== 9) {
      return {idNotValid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  private validateMilitary(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

}
