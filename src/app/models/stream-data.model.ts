import { IStreamData } from "./stream-data.interface"

export class StreamData {

  message: string;
  color: string;
  timestamp: number;

  constructor(data: IStreamData) {
    this.message = data.message
    this.color = data.color ?? 'rgb(126, 126, 126)'
    this.timestamp = Date.now()
  }
}
