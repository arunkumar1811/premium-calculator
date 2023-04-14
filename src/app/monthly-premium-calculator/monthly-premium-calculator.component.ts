import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Occupation } from '../model/occupation';
import { OccupationService } from '../services/occupation-service';


@Component({
  selector: 'app-monthly-premium-calculator',
  templateUrl: './monthly-premium-calculator.component.html',
  styleUrls: ['./monthly-premium-calculator.component.css']
})
export class MonthlyPremiumCalculatorComponent implements OnInit {
  name: string
  age: number;
  occupation: string;
  smoker: boolean;
  premium: number;
  minDate: any;
  maxDate: any;
  firstDate: any;
  occupations: Occupation[];
  nameControl: FormControl = new FormControl();
  ageControl: FormControl = new FormControl();
  occupationControl: FormControl = new FormControl();
  dobControl: FormControl = new FormControl();
  sumInsuredControl: FormControl = new FormControl();
  deathPremium: any;
  TPBPremium: any;
  OccupationRatings: any
  isFormInValid = true;


  constructor(private occupationService: OccupationService) { }

  ngOnInit() {
    let now = new Date();
    now.setFullYear(now.getFullYear() - 70);
    this.minDate = now;
    this.maxDate = new Date;
    this.occupationService.getOccupationRatings().subscribe((res: any) => {
      if (res) {
        this.OccupationRatings = res;
      }
    });

    this.occupationService.getOccupation().subscribe((res: Occupation[]) => {
      if (res && res.length > 0)
        this.occupations = res;
    });
  }

  calculatePremium() {

    this.validateControls();
    let occRating = this.OccupationRatings[this.occupationControl.value];
    if (occRating) {
      this.deathPremium = ((this.sumInsuredControl.value * parseFloat(occRating) * this.ageControl.value) / 1000 * 12).toFixed(2);
      this.TPBPremium = ((this.sumInsuredControl.value * parseFloat(occRating) * this.ageControl.value) / 1234).toFixed(2)
    }

  }

  validateControls() {
    this.nameControl.markAsTouched();
    this.ageControl.markAsTouched();
    this.occupationControl.markAsTouched();
    this.dobControl.markAsTouched();
    this.sumInsuredControl.markAsTouched();
    this.occupationControl.markAsTouched();
    this.validateAge();

    if(!this.occupationControl.value)
      this.occupationControl.setErrors({'required':true})

    this.isFormInValid = this.nameControl.invalid || this.ageControl.invalid || 
    this.occupationControl.invalid || this.sumInsuredControl.invalid || this.dobControl.invalid

  }

  dobValueChanged(event) {
    var today = new Date();
    var birthDate = new Date(event.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.ageControl.setValue(age);
  }

  validateAge() {
    if (!this.ageControl.value) {
      this.ageControl.setErrors({ 'required': true })
    }
    else if (this.ageControl.value > 70)
      this.ageControl.setErrors({ 'range': true })
    else {
      this.ageControl.setErrors(null)
    }
  }

}
