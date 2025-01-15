import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BsDatepickerConfig,
  DatepickerDateCustomClasses,
} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  selectedDates: Date[] = [];
  dateCustomClasses: DatepickerDateCustomClasses[] = [];

  // Configuração do Datepicker
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-green',
    showWeekNumbers: false,
    adaptivePosition: true,
    isAnimated: false,
    selectFromOtherMonth: true,
    locale: 'pt-br',
  } as Partial<BsDatepickerConfig> & { locale?: string };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null, // Usado apenas para vinculação ao componente
    });
    this.updateDateCustomClasses();
  }

  // Método chamado ao clicar em uma data no calendário
  onDateSelect(selectedDate: Date) {
    if (selectedDate) {
      const normalizedDate = this.normalizeDate(selectedDate);
      const index = this.selectedDates.findIndex(
        (date) =>
          this.normalizeDate(date).getTime() === normalizedDate.getTime()
      );

      if (index === -1) {
        // Adiciona a data, caso ela não esteja na lista
        this.selectedDates.push(normalizedDate);
      } else {
        // Remove a data, caso ela já esteja na lista
        this.selectedDates.splice(index, 1);
      }

      this.updateDateCustomClasses(); // Atualiza as classes CSS
    }
  }
  // Normaliza uma data para comparar apenas dia, mês e ano
  normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Atualiza as classes CSS das datas selecionadas
  updateDateCustomClasses() {
    this.dateCustomClasses = this.selectedDates.map((date) => ({
      date,
      classes: ['highlight-selected'], // Classe CSS para destacar as datas selecionadas
    }));
  }

  // Remove uma data da lista ao clicar diretamente no botão "remover"
  removeDate(date: Date) {
    const index = this.selectedDates.findIndex(
      (d) =>
        this.normalizeDate(d).getTime() === this.normalizeDate(date).getTime()
    );
    if (index !== -1) {
      this.selectedDates.splice(index, 1);
      this.updateDateCustomClasses(); // Atualiza as classes CSS
    }
  }
}
