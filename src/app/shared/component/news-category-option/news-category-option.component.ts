import { Component, Input, OnInit } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NewsCategory } from '../../../pages/news-category/news-category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-category-option',
  standalone: true,
  imports: [NzSelectModule, CommonModule],
  templateUrl: './news-category-option.component.html',
  styleUrl: './news-category-option.component.scss',
})
export class NewsCategoryOptionComponent implements OnInit {
  @Input() categoryItem!: NewsCategory;
  @Input() level = 0;
  ngOnInit() {
    console.log(this.categoryItem, this.level);
  }

  getIndentedName(categoryItem: NewsCategory): string {
    return ' '.repeat(this.level * 2) + categoryItem.title; // Indent name by level
  }
}
