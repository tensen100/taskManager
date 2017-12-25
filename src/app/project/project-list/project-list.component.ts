import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { SlideToRight } from '../../animation/router.animation';
import { ListAnimation } from '../../animation/list.animation';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [SlideToRight, ListAnimation]
})
export class ProjectListComponent implements OnInit {
  @HostBinding('@routeAnimation')
  projects = [
    {
      name: '企业协作平台',
      desc: '这是一个内部项目',
      coverImg: 'assets/imgs/img_01.jpg',
      id: 1
    },
    // {
    //   name: '企业协作平台',
    //   desc: '这是一个内部项目',
    //   coverImg: 'assets/imgs/img_01.jpg',
    //   id: 2
    // },
    {
      name: '企业协作平台',
      desc: '这是一个内部项目',
      coverImg: 'assets/imgs/img_01.jpg',
      id: 3
    }
  ];
  constructor(private dialog: MatDialog) {}
  ngOnInit() {}
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: {title: '新增项目：'}});
    dialogRef.afterClosed().subscribe( res => {
      console.log( res );
      this.projects = [...this.projects, {
        id: Math.floor(Math.random() * 100),
        name: '新项目', desc: '这是一个新项目',
        coverImg: 'assets/imgs/img_01.jpg'
      },
        {
          id: Math.floor(Math.random() * 100),
          name: '新项目', desc: '这是一个新项目',
          coverImg: 'assets/imgs/img_01.jpg'
        }];
    });
  }
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }
  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: {title: '编辑项目：'}});
  }
  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除项目',
        content: '确认删除此项目吗?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter( p => p.id !== project.id);
    });
  }
}
