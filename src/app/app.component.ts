import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
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

  bsConfig: Partial<BsDatepickerConfig> & { locale?: string } = {
    containerClass: 'theme-green',
    showWeekNumbers: false,
    selectFromOtherMonth: true,
    locale: 'pt-br',
    showTodayButton: true,
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null, // Vinculado ao calendário
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
    }
  }

  // Normaliza uma data para comparação (remove hora, minuto, etc.)
  normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Verifica se uma data está selecionada
  isDateSelected(date: Date): boolean {
    const normalizedDate = this.normalizeDate(date);
    return this.selectedDates.some(
      (selectedDate) =>
        this.normalizeDate(selectedDate).getTime() === normalizedDate.getTime()
    );
  }
  customDayClass(date: Date): string {
    return this.isDateSelected(date) ? 'highlight-selected' : '';
  }
}
