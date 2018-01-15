import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  title = '';
  coverImages = [];
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    const project = this.data.project;
    this.coverImages = this.data.thumbnails;
    if (project) {
      this.form = this.fb.group({
        name: [project.name, Validators.required],
        desc: [project.desc],
        coverImg: [project.coverImg]
      });
      this.title = '修改项目';
    }else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.img]
      });
      this.title = '创建项目';
    }
    // console.log(JSON.stringify(this.data));
  }
  // save() {
  //   this.dialogRef.close('I received your message');
  // }
  onSubmit({value, valid}, ev: Event) {
    if ( !valid) {
      return;
    }
    this.dialogRef.close(value);
  }

}
