import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-repeat',
  imports: [CommonModule],
  exportAs: 'RepeatComponent',
  templateUrl: './repeat.component.html',
  styleUrl: './repeat.component.scss'
})
export class RepeatComponent {
  @Input() option: {name: string}[] = [];
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  constructor() {
  }
}
