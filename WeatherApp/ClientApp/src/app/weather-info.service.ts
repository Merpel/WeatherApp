import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WeatherDetail } from './weather-detail/weather-detail.model';
import { LocationDetail } from './location-detail/location-detail.model';

/**
 * This class handles the calls to the calls to the API on the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherInfoService {

  formData: WeatherDetail = new WeatherDetail();
  readonly rootURL = 'https://localhost:5001/api';
  list: WeatherDetail[];
  locationList: LocationDetail[];
  locationData: LocationDetail = new LocationDetail();

  constructor(private http: HttpClient) { }

  // This is the method that will send new info to the backend that will then create a new entry to the database/datalist.
  postWeatherDetail() {
    return this.http.post(`${this.rootURL}/WeatherInfos`, this.formData);
  }

  // This is the method that will be used to update an already existing entry. 
  putWeatherDetail() {
    return this.http.put(`${this.rootURL}/WeatherInfos/${this.formData.id}`, this.formData);
  }

  // This is the method that will be used to detele an entry. This will only be called when a location is deleted as all the WeatherInfos are tied to a place.
  deleteWeatherDetail(id) {
    return this.http.delete(`${this.rootURL}/WeatherInfos/${id}`);
  }

  // This is a GET method that will return the info from backend into a WeatherDetail array that can be shown in frontend.
  refreshList() {
    this.http.get(`${this.rootURL}/WeatherInfos/`)
      .toPromise()
      .then(res => this.list = res as WeatherDetail[]);
  }

  //METHODS FOR api/WeatherInfos/Locations endpoint

  // This is the method that will send new info to the backend that will then create a new entry to the database/datalist.
  postLocation() {
    return this.http.post(`${this.rootURL}/WeatherInfos/Locations`, this.locationData);
  }

  // This is the method that will be used to update an already existing entry. 
  putLocation() {
    return this.http.put(`${this.rootURL}/WeatherInfos/Locations/${this.locationData.id}`, this.locationData);
  }

  // This is the method that will be used to detele an entry. It will be used to delete a place. 
  deleteLocation(id) {
    return this.http.delete(`${this.rootURL}/WeatherInfos/Locations/${id}`);
  }

  // This is a GET method that will return the info from backend into a LocationDetail array that can be shown in frontend. 
  refreshLocationList() {
    this.http.get(`${this.rootURL}/WeatherInfos/Locations`)
      .toPromise()
      .then(res => this.locationList = res as LocationDetail[]);
  }
}
