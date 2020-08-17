import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightSearchPipe } from './highlight-search.pipe';



@NgModule({
  declarations: [HighlightSearchPipe],
  imports: [
    CommonModule
  ],
  exports: [HighlightSearchPipe]
})
export class SharedModule { }
