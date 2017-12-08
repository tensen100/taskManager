/**
 * 公共模块
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule // 其他模块不必再导入CommonModule
  ],
  declarations: []
})
export class ShareModule { }
