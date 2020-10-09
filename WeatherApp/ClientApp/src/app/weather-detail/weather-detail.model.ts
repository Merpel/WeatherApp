import { Component } from '@angular/core';

/** Class that defines the structure of weatherdetail. The structure is the same that is in the WeatherInfo.cs */
export class WeatherDetail {
  id: number;
  date: string;
  temperature: number;
  wind: number;
  rain: number;
  place: string;
}