import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vacation } from '../models/vacation';
import { VacationService } from '../services/vacation.service';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})
export class VacationRequestComponent implements OnInit {
  @Output() onChanged = new EventEmitter<Vacation>();

  @Input() vacation: Vacation;
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private vacationService: VacationService){}

  ngOnInit(): void {
    this.vacation= {from: new Date, to: new Date, type: '', iduser: 0, employee: ''};
    this.form = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.vacationService.requestVacation(this.form.value);
  }

}
