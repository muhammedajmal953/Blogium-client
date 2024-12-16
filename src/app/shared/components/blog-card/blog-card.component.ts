import { Component, Input, Output } from '@angular/core';
import { IBlog } from '../../../core/models/IBlog';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  imports: [DatePipe,CommonModule,RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {
  @Input() blogs!: IBlog[]|any
}
