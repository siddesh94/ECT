import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomSortPipe } from '../pipes/custom-sort.pipe';
import { CommonModule } from '@angular/common';
import { RepeatComponent } from '../repeat/repeat.component';

interface Options {
  name: String;
  price: Number;
  created: Date;
  desc: String | null;
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CustomSortPipe, RepeatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-ect-test';
  options: Options[] = [
    {
      name: 'Apple Monitor',
      price: 40000,
      created: new Date('03/07/2025'),
      desc: 'New'
    },
    {
      name: 'Printer',
      price: 12000,
      created: new Date('10/10/2024'),
      desc: 'Used'
    },
    {
      name: 'Laptop',
      price: 150000,
      created: new Date('09/09/2020'),
      desc: null
    },
    {
      name: 'Pendrive 128GB',
      price: 2000,
      created: new Date('09/27/2021'),
      desc: 'Refurbished'
    },
    {
      name: 'Keyboard & Mouse',
      price: 1200,
      created: new Date('06/07/2022'),
      desc: null
    },
  ];

  repeatData = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];

  constructor() {
  }
}
