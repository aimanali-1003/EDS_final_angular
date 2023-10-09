import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-levels-dialog',
  templateUrl: './levels-dialog.component.html',
  styleUrls: ['./levels-dialog.component.css']
})
export class LevelsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
