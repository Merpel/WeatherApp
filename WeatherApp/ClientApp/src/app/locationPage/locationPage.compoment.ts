import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { WeatherInfoService } from '../weather-info.service';

/** Class that handles the adding of locations as well as the deletion of both locations and weatherdetails that are tied to that location.*/
@Component({
  selector: 'app-locationPage-component',
  templateUrl: './locationPage.component.html',
  styleUrls: ['./locationPage.component.css']
})

export class LocationPageComponent {

  form: FormGroup;
  public duplicate: boolean = false;

  paikkakunta = new FormControl('', Validators.required);

  constructor(fb: FormBuilder, public service: WeatherInfoService) {
    this.form = fb.group({
      "paikkakunta": this.paikkakunta,
    });
    service.refreshLocationList();
    service.refreshList();
  }

  /** Method that gets user input for new location and checks if the input is a location that hasn't been added yet. */
  onSubmit() {
    this.service.locationList.map((res: any) => {
      if (res.place === this.form.value.paikkakunta) {
        alert("Kyseinen paikkakunta on jo lisätty. Paikkakunta listauksessa voi olla vain yksilöllisiä arvoja.");
        this.duplicate = true;
      }
    });

    if (!this.duplicate) {
      this.service.locationData.place = this.form.value.paikkakunta;
      this.insertLocation();
    }

    this.form.reset();
    this.duplicate = false;
  }

  /** Method that sends the element to backend via the service and also retrieves all the entered weatherInfo elements.*/
  insertLocation() {
    this.service.postLocation().subscribe(
      res => {
        this.form.reset();
        this.service.refreshLocationList();
      },
      err => { console.log(err); }
    )
  }

  /**
   * Method that is responsible for removing the location and the weatherinfos that are logged for that location.
   * @param place Location object that will be removed.
   */
  removeLocation(place) {

    if (confirm('Poistamalla paikan poistat myös säätiedot kyseiseltä paikalta. Poistetaanko paikkakunta ?')) {
      let tempArr = [];

      // Check if there are any weatherinfos for the specified location.
      if (this.service.list.length > 0) {
        this.service.list.forEach(x => {
          if (x.place === place.place) {
            tempArr.push(x.id);
          }

        });

        if (tempArr.length > 0) {
          tempArr.forEach(id => {
            this.service.deleteWeatherDetail(id).subscribe(
              res => {
                this.service.refreshList();
              },
              err => { console.log(err); }
            )
          });
        }

      }

      this.service.deleteLocation(place.id)
        .subscribe(res => {
          this.service.refreshLocationList();
        },
          err => { console.log(err); })
    }

  }

}
