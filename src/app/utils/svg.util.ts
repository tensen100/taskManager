import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const svgDir = `assets/svg`;
  const commonDir = `${svgDir}/common`;
  const sidebarDir = `${svgDir}/sidebar`;
  const daysDir = `${svgDir}/days`;
  const avatarDir = `${svgDir}/avatar`;
  ir.addSvgIcon('menu', ds.bypassSecurityTrustResourceUrl(`${commonDir}/menu.svg`));
  ir.addSvgIcon('delete', ds.bypassSecurityTrustResourceUrl(`${commonDir}/delete.svg`));
  ir.addSvgIcon('plus', ds.bypassSecurityTrustResourceUrl(`${commonDir}/plus.svg`));
  ir.addSvgIcon('plus-circle-outline', ds.bypassSecurityTrustResourceUrl(`${commonDir}/plus-circle-outline.svg`));
  ir.addSvgIcon('pencil', ds.bypassSecurityTrustResourceUrl(`${commonDir}/pencil.svg`));
  ir.addSvgIcon('account-multiple-plus', ds.bypassSecurityTrustResourceUrl(`${commonDir}/account-multiple-plus.svg`));
  ir.addSvgIcon('alarm', ds.bypassSecurityTrustResourceUrl(`${commonDir}/alarm.svg`));
  ir.addSvgIcon('arrange-send-backward', ds.bypassSecurityTrustResourceUrl(`${commonDir}/arrange-send-backward.svg`));
  ir.addSvgIcon('chevron-down', ds.bypassSecurityTrustResourceUrl(`${commonDir}/chevron-down.svg`));
  ir.addSvgIcon('delete-forever', ds.bypassSecurityTrustResourceUrl(`${commonDir}/delete-forever.svg`));
  ir.addSvgIcon('account-box', ds.bypassSecurityTrustResourceUrl(`${commonDir}/account-box.svg`));

  ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));

  ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
  ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
  ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
  ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31];
  days.forEach( d => {
    ir.addSvgIcon(`day${d}`, ds.bypassSecurityTrustResourceUrl(`${daysDir}/day${d}.svg`));
  });
};
