import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../domain';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  members: User[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<InviteComponent>) { }

  ngOnInit() {
    this.members = [...this.data.members];
  }
  onSubmit(ev: Event, {valid, value}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }

  /*displayUser(user: {id: string; name: string}) {
    return user ? user.name : '';
  }*/
}
