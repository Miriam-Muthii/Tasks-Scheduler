import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Dialog import, if used in your component
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'; 


@Component({
  selector: 'app-study',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    FormsModule ,
    MatSnackBarModule,
    MatTableModule,
  ],
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
})
export class StudyComponent {
  task: any[] = [];
  newTask = { name: '', description: '', startTime: '', endTime: '' };
  displayedColumns: string[] = ['name', 'description', 'startTime', 'endTime'];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

 
  addTask(task: any) {
    if (task.name && task.description) {
      this.task.push(task);
      this.newTask = { name: '', description: '', startTime: '', endTime: '' };
      this._snackBar.open('Task added successfully!', 'Close', { duration: 2000 });
    } else {
      this._snackBar.open('Please fill in both task name and description.', 'Close', { duration: 2000 });
    }
  }


  generateSchedule() {
    const startDate = new Date(2025, 0, 15); // Start on Monday, Jan 15, 2025
    const endDate = new Date(2025, 0, 19);   // End on Friday, Jan 19, 2025

    const timeBlocks = [
      { startTime: '09:00', endTime: '12:00', task: 'Angular & Java Projects' },
      { startTime: '15:00', endTime: '17:00', task: 'German Self-Study' },
      { startTime: '21:00', endTime: '00:00', task: 'German Classes' },
    ];

    // Create the workbook and worksheet only once
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Study Schedule');

    // Add headers to the sheet
    worksheet.addRow(['Date', 'Start Time', 'End Time', 'Task']);

    let currentDate = new Date(startDate);

    // Loop through each date
    while (currentDate <= endDate) {
      // Loop through each time block for the current date
      timeBlocks.forEach(block => {
        const [startHour, startMinute] = block.startTime.split(':').map(Number);
        const [endHour, endMinute] = block.endTime.split(':').map(Number);

        const formattedDate = currentDate.toLocaleDateString();

        // Add the data to the worksheet
        worksheet.addRow([formattedDate, block.startTime, block.endTime, block.task]);
      });

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Generate the Excel file after all rows are added
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'study_schedule.xlsx');
    });
  }
}
