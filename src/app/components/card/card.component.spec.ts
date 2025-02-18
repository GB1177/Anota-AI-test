import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve receber valores do @Input', () => {
    component.id = 1;
    component.title = 'Card Test';
    component.description = 'Description Test';
    component.img = 'test-image.jpg';
    component.type = 'test-type';

    fixture.detectChanges();

    expect(component.id).toBe(1);
    expect(component.title).toBe('Card Test');
    expect(component.description).toBe('Description Test');
    expect(component.img).toBe('test-image.jpg');
    expect(component.type).toBe('test-type');
  });

  it('deve alternar isHovered ao chamar toggleHover()', () => {
    expect(component.isHovered).toBeFalse();

    component.toggleHover(true);
    expect(component.isHovered).toBeTrue();

    component.toggleHover(false);
    expect(component.isHovered).toBeFalse();
  });

  it('deve emitir o evento removeCard quando onDelete() for chamado', () => {
    spyOn(component.removeCard, 'emit');

    component.id = 123;
    component.onDelete();

    expect(component.removeCard.emit).toHaveBeenCalledWith(123);
  });

  it('deve aplicar a classe hover quando isHovered for verdadeiro', () => {
    component.isHovered = true;
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(By.css('.card'));
    expect(cardElement.classes['card-hover']).toBeTrue();
  });

  it('deve chamar onDelete() quando o botão Fechar for clicado', () => {
    spyOn(component, 'onDelete');

    const button = fixture.debugElement.query(
      By.css('.close-btn')
    ).nativeElement;
    button.click();

    expect(component.onDelete).toHaveBeenCalled();
  });
});
