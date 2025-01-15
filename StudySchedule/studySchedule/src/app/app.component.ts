import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudyComponent } from './study/study.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'studySchedule';
}
