import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('aplicação foi criada', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('deve possuir o título Cedro', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.titulo).toEqual('Avaliação Cedro');
  }));

  it('deve renderizar o titulo em um span na toolbar', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.titulo-aplicacao').textContent).toContain('Avaliação Cedro');
  }));

  it('deve renderizar o menu para página inicial', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const link = compiled.querySelector('.link-home');
    expect(link.textContent).toContain('Home');
    expect(link.getAttribute('routerlink')).toBe('/inicial');
  }));

  it('deve renderizar o menu para página restaurantes', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const link = compiled.querySelector('.link-restaurantes');
    expect(link.textContent).toContain('Restaurantes');
    expect(link.getAttribute('routerlink')).toBe('/restaurantes');
  }));

  it('deve renderizar o menu para página pratos', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const link = compiled.querySelector('.link-pratos');
    expect(link.textContent).toContain('Pratos');
    expect(link.getAttribute('routerlink')).toBe('/pratos');
  }));

});
