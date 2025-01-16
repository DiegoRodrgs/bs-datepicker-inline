import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BsDatepickerConfig,
  DatepickerDateCustomClasses,
  BsLocaleService,
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
  selectedDates: Date[] = []; // Armazena as datas selecionadas
  dateCustomClasses: DatepickerDateCustomClasses[] = [];

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-green',
    showWeekNumbers: false,
    selectFromOtherMonth: true,
  };

  constructor(
    private formBuilder: FormBuilder,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null, // Opcional: Campo de exemplo para referência
    });
  }

  // Método chamado ao clicar em uma data no calendário
  onDateSelect(selectedDate: Date) {
    if (selectedDate) {
      const normalizedDate = this.normalizeDate(selectedDate); // Normaliza a data para evitar problemas de comparação
      const index = this.selectedDates.findIndex(
        (date) =>
          this.normalizeDate(date).getTime() === normalizedDate.getTime()
      );

      if (index === -1) {
        // Adiciona a data ao array
        this.selectedDates.push(normalizedDate);
      } else {
        // Remove a data do array
        this.selectedDates.splice(index, 1);
      }

      // Atualiza as classes customizadas
      this.updateDateCustomClasses();
    }
  }

  // Normaliza uma data para comparação (remove hora, minuto, etc.)
  normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Atualiza as classes customizadas para as datas selecionadas
  updateDateCustomClasses() {
    this.dateCustomClasses = this.selectedDates.map((date) => ({
      date,
      classes: ['highlight-selected'],
    }));
  }
}
