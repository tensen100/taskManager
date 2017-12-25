import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { SlideToRight } from '../../animation/router.animation';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [ SlideToRight ]
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routeAnimation')
  lists = [
    {
      id : 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克买杯咖啡！',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 1,
          desc: '任务二：去星巴克买杯咖啡！qe qw 微软去去请 ',
          completed: false,
          priority: 2,
          reminder: new Date(),
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 1,
          desc: '任务三：去星巴克买杯咖啡！',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
      ]
    },
    {
      id : 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克买杯咖啡！',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 1,
          desc: '任务二：去星巴克买杯咖啡！',
          completed: false,
          priority: 2,
          reminder: new Date(),
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 1,
          desc: '任务三：去星巴克买杯咖啡！',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
      ]
    },
  ];
  constructor(private dialog: MatDialog) { }
  ngOnInit() {
  }
  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent, {data: {title: '新建任务：'}});
  }
  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {
      data: { lists: this.lists}
    });
  }
  launchUpdateTasksDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: '修改任务：',
        task: task
      }
    });
  }
  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除列表',
        content: '确认删除此列表吗?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  launchEditListDialog(list) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '修改列表名称：',
        list: list
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
    });
  }
  launchNewProjectDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '新增列表名称：',
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
    });
  }
  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list':
        console.log('handling list');
        break;
      default:
        break;
    }
  }
  handleQuickTask(desc: string) {
    console.log(desc);
  }

}
