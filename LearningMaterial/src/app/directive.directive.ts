import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDirective]',
  standalone: true
})
export class DirectiveDirective {
  @Input() highlightColor: string='';
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('red');
  }

  private highlight(color: string) {
console.log(color);
    

    this.el.nativeElement.style.backgroundColor = color;
  }
}
