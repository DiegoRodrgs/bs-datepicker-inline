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
  selectedDates: Date[] = [];

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
      date: [null], // Apenas uma data selecionada
    });
  }

  // Método chamado ao selecionar uma data
  onDateSelect(date: Date) {
    if (date) {
      this.selectedDates = [date];
    }
  }
}
