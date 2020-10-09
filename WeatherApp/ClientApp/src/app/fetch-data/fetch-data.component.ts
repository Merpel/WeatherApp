import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherInfoService } from '../weather-info.service';
import { WeatherDetail } from '../weather-detail/weather-detail.model';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

/** Class that handles the page where user can see and filter graphs made from weatherdata. */
@Component({
  selector: 'app-fetch-data-component',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit {

  // Global variables that are used to create filtering for graphs.
  public startDate: string = "";
  public endDate: string = "";
  public paikat = [];
  public paikat2 = [];
  public form: FormGroup;
  public listObj = [];
  public listLkm = [];
  public listTemp = [];
  public listRain = [];
  public listWind = [];
  public noMatch: boolean = false;
  public dateModified: boolean = false;


  // Global variables that are used to create the graphs.
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartDataFirst: ChartDataSets[] = [];
  public barChartDataSecond: ChartDataSets[] = [];
  public barChartDataThird: ChartDataSets[] = [];
  public barChartColorsTemp: Color[] = [{ backgroundColor: '#ADD8E6' }];
  public barChartColorsWind: Color[] = [{ backgroundColor: '#FF6347' }];
  public barChartColorsRain: Color[] = [{ backgroundColor: '#4863A0' }];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };


  constructor(public service: WeatherInfoService, fb: FormBuilder) {
    this.form = fb.group({
      "startDate": this.startDate,
      "endDate": this.endDate,
      "places": fb.array([]),
    });
  }


  ngOnInit() {
    this.service.refreshList();
    this.service.refreshLocationList();
  }

  /**
   * Method that handles the clicking of a checkbox.
   * @param e Event
   */
  onCheckboxChange(e) {
    const places: FormArray = this.form.get('places') as FormArray;

    if (e.target.checked) {
      places.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      places.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          places.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  /** Method that assigns the user input values into global variables. */
  onSubmit() {
    this.paikat2 = this.form.value.places;
    if (this.form.value.startDate !== "" && this.form.value.endDate !== "") {
      this.startDate = this.form.value.startDate;
      this.endDate = this.form.value.endDate;
    }
    this.form.reset();
    (this.form.get('places') as FormArray).clear();
    this.service.refreshLocationList();
  }

  /** Method that adds all necessary information to arrays so that the graphs can be built correctly. */
  showGraphs() {
    this.service.refreshList();
    this.service.refreshLocationList();

    this.listObj = [];
    this.listTemp = [];
    this.listRain = [];
    this.listWind = [];
    this.listLkm = [];
    let arr = [];
    let arr2 = [];

    this.service.list.map((res: any) => {
      this.listObj.push(res);
    });

    this.service.locationList.map((res: any) => {
      this.paikat.push(res.place);
    });

    // Checks that determine if the user has given any filtering options for the graphs.
    if (this.paikat2.length < 1) this.paikat2 = this.paikat;

    if (this.startDate !== "" && this.endDate !== "" && this.startDate !== null && this.endDate !== null) {
      arr2 = this.listObj.filter(info =>
        new Date(info.date) <= new Date(this.endDate) && new Date(info.date) >= new Date(this.startDate));
      this.dateModified = true;
    }

    // For loop that is used to push information retrieved from the server into arrays that are used to make graphs.
    for (let i = 0; i < this.paikat2.length; i++) {
      if (this.dateModified) {
        arr = arr2.filter(info => info.place === this.paikat2[i]);
      }
      else {
        arr = this.listObj.filter(info => info.place === this.paikat2[i]);
      }

      this.listTemp.push(0);
      this.listRain.push(0);
      this.listWind.push(0);
      this.listLkm.push(0);

      arr.forEach(x => {
        this.listTemp[i] += x.temperature;
        this.listRain[i] += x.rain;
        this.listWind[i] += x.wind;
        this.listLkm[i] += 1;
      });

      this.listTemp[i] = this.listTemp[i] / this.listLkm[i];
      this.listWind[i] = this.listWind[i] / this.listLkm[i];
    }

    if (arr.length < 1) {
      this.noMatch = true;
    }
    else {
      this.noMatch = false;
    }

    this.buildChart();
  }

  /** Method that is responsible for assigning the arrays to correct variables for the graphs.
   * It also clears the arrays and variables used with filtering the graphs. */
  buildChart() {

    this.barChartLabels = this.paikat2;
    this.barChartDataFirst = [{ data: this.listTemp, label: 'Keskilämpötila' }];
    this.barChartDataSecond = [{ data: this.listWind, label: 'Keskimääräinen tuulen nopeus' }];
    this.barChartDataThird = [{ data: this.listRain, label: 'Sateen määrä' }];

    this.paikat2 = [];
    this.paikat = [];
    this.startDate = "";
    this.endDate = "";
    this.dateModified = false;
  }

}
