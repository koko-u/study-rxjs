import { Injectable } from '@angular/core';
import { StreamData } from "../models/stream-data.model"

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private counter = 0
  logs: string[] = []

  constructor() { }

  add(data: StreamData) {
    this.logs.push(`${++this.counter}: ${data.message}`)
  }

  reset() {
    this.counter = 0
    this.logs = []
  }
}
