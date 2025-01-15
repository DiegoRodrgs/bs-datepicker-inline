import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
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
  };

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

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

      // Atualiza os destaques no calendário
      this.updateCalendarHighlights();
    }
  }

  // Normaliza uma data para comparação (remove hora, minuto, etc.)
  normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Atualiza os destaques no calendário
  updateCalendarHighlights() {
    const calendarCells = this.el.nativeElement.querySelectorAll(
      '.bs-datepicker .day'
    ); // Seleciona todas as células do calendário

    calendarCells.forEach((cell: HTMLElement) => {
      const dayText = cell.textContent?.trim();
      if (dayText) {
        const cellDate = new Date(
          new Date().getFullYear(), // Ano atual
          new Date().getMonth(), // Mês atual
          parseInt(dayText, 10) // Dia baseado no texto da célula
        );

        const isSelected = this.selectedDates.some(
          (date) =>
            this.normalizeDate(date).getTime() ===
            this.normalizeDate(cellDate).getTime()
        );

        if (isSelected) {
          this.renderer.addClass(cell, 'highlight-selected');
        } else {
          this.renderer.removeClass(cell, 'highlight-selected');
        }
      }
    });
  }
}
