import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SideMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
