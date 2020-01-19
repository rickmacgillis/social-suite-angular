import { Directive, Renderer2, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.show') isOpen: boolean = false;

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    this.isOpen = this.hostElement.nativeElement.contains(event.target) ? !this.isOpen : false;

    const id = this.hostElement.nativeElement.id;
    const dropdownMenu = document.querySelector('#' + id + ' > .dropdown-menu');
    if (this.isOpen) {
      this.renderer.addClass(dropdownMenu, 'show');
    } else {
      this.renderer.removeClass(dropdownMenu, 'show');
    }
  }

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

}
