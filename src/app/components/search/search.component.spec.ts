import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { Component } from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir searchText quando a entrada for alterada', () => {
    spyOn(component.searchText, 'emit');

    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    inputElement.value = 'Angular Test';

    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.searchText.emit).toHaveBeenCalledWith('angular test');
  });
});
