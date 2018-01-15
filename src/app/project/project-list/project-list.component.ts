import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { SlideToRight } from '../../animation/router.animation';
import { ListAnimation } from '../../animation/list.animation';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../domain';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [SlideToRight, ListAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation')
  projects;
  sub: Subscription;
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private service: ProjectService) {}
  ngOnInit() {
    this.sub = this.service.get('1').subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck(); // 脏值检测
    } );
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/cover${Math.floor(Math.random() * 15) + 1}.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        img: selectedImg
      }
    });
    dialogRef.afterClosed()
      .take(1) // 使用一次销毁
      .filter( n => n)
      .switchMap( v => this.service.add(v))
      .subscribe( project => {
        this.projects = [...this.projects, project];
        this.cd.markForCheck();
    });
  }
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, {
      data: {
        members: []
      }
    });
  }
  launchUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        project: project
      }
    });
    dialogRef.afterClosed()
      .take(1) // 使用一次销毁
      .filter( n => n)
      .switchMap( v => this.service.update({...v, id: project.id}))
      .subscribe( p => {
        const index = this.projects.map(d => d.id).indexOf(p.id);
        console.log(index);
        this.projects = [...this.projects.slice(0, index), p, ...this.projects.slice(index + 1)];
        this.cd.markForCheck();
      });
    // const dialogRef = this.dialog.open(NewProjectComponent, { data: {title: '编辑项目：'}});
  }
  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除项目',
        content: '确认删除此项目吗?'
      }
    });
    dialogRef.afterClosed()
      .take(1) // 使用一次销毁
      .filter( n => n)
      .switchMap(() => this.service.del(project))
      .subscribe( prj => {
        this.projects = this.projects.filter(p => p.id !== prj.id);
        this.cd.markForCheck();
      });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    //   this.projects = this.projects.filter( p => p.id !== project.id);
    // });
  }
  getThumbnails() {
    return _.range(1, 16)
      .map( i => `/assets/img/covers/cover${i}.jpg`);
  }
}
