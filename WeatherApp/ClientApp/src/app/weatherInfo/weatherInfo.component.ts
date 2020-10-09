import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { WeatherInfoService } from '../weather-info.service';

/** Class that handles the creation and editing of weatherInfo objects. */
@Component({
  selector: 'app-weatherInfo-component',
  templateUrl: './weatherInfo.component.html',
  styleUrls: ['./weatherInfo.component.css']
})
export class WeatherComponent {

  public editing: boolean = false;
  public duplicate: boolean = false;
  form: FormGroup;

  // Basic required validators for the form inputs.
  temperature = new FormControl('', Validators.required);
  rain = new FormControl('', Validators.required);
  wind = new FormControl('', Validators.required);
  pvm = new FormControl(new Date("2020-08-20").toISOString().slice(0, 10), Validators.required);
  paikka = new FormControl('', Validators.required);

  constructor(fb: FormBuilder, public service: WeatherInfoService) {
    this.form = fb.group({
      "pvm": this.pvm,
      "temperature": this.temperature,
      "rain": this.rain,
      "wind": this.wind,
      "paikka": this.paikka
    });
    service.refreshLocationList();
    service.refreshList();
  }

  /** Method that handles the submitting of the form and checks if the user input hasn't been added yet.
   *  Only one entry per date is allowed for one location.*/
  onSubmit() {

    this.addValues();

    this.service.list.map((res: any) => {
      let dt = new Date(res.date);
      dt.setHours(8);
      if (res.place === this.form.value.paikka && dt.toISOString().slice(0, 10) === this.form.value.pvm) {
        this.duplicate = true;
      }
    });

    if (this.editing) {
      this.modifyInfo();
    }
    else if (!this.duplicate) {
      this.insertInfo();
    }
    else {
      alert("Tietokannassa on säätiedot kyseiselle paikkakunnalta antamaltasi päivältä. Tietokannassa jokaisella paikkakunnalla"
        + " voi olla vain yksi kirjaus yhdelle päivämäärälle.");
    }

    this.form.reset();
    this.duplicate = false;
  }

  /** Method that adds user inputs to the formData element. */
  addValues() {
    let dt = new Date(this.form.value.pvm);
    dt.setHours(8);
    this.service.formData.date = dt.toISOString().slice(0, 10);
    this.service.formData.temperature = this.form.value.temperature;
    this.service.formData.rain = this.form.value.rain;
    this.service.formData.wind = this.form.value.wind;
    this.service.formData.place = this.form.value.paikka;
  }

  /** Method that sends the element to backend via the service and also retrieves all the entered weatherInfo elements. */
  insertInfo() {
    this.service.postWeatherDetail().subscribe(
      res => {
        this.form.reset();
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }

  /**  Method that send an element to backend via the service that is modified version of an existing one.
   *  It also retrieves all the entered weatherInfo elements. */
  modifyInfo() {
    this.service.putWeatherDetail().subscribe(
      res => {
        this.form.reset();
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
    this.editing = false;
  }

  /**
   * Methdod that will put the selected values into the form for the user to modify.
   * @param forecast Selected weatherInfo
   */
  populateForm(forecast) {
    let dt = new Date(forecast.date);
    dt.setHours(8);
    this.form.patchValue({
      "pvm": dt.toISOString().slice(0, 10),
      "temperature": forecast.temperature,
      "rain": forecast.rain,
      "wind": forecast.wind,
      "paikka": forecast.place
    });
    this.editing = true;
    this.service.formData.id = forecast.id;
  }
}
