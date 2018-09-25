import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InicialComponent } from './inicial.component';
import { MaterialModule } from '../material.module';
describe('InicialComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [
        InicialComponent
      ],
    }).compileComponents();
  }));
  it('componente foi criado', async(() => {
    const fixture = TestBed.createComponent(InicialComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('deve possuir o título SISTEMA DE CADASTRO DE RESTAURANTES', async(() => {
    const fixture = TestBed.createComponent(InicialComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.titulo).toEqual('SISTEMA DE CADASTRO DE RESTAURANTES');
  }));

  it('deve renderizar o titulo em um h1', async(() => {
    const fixture = TestBed.createComponent(InicialComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.titulo-secao').textContent).toContain(fixture.componentInstance.titulo);
  }));

});
