import { Injectable } from '@angular/core';
import { StreamData } from "../models/stream-data.model"
import {
  Observable,
  Subject,
  map,
  filter,
  throttleTime,
  debounceTime,
  distinctUntilChanged,
  merge,
  switchMap,
  skip,
  take,
  finalize, interval
} from "rxjs"
import { IStreamData } from "../models/stream-data.interface"
import { Operator } from "../models/operator.model"

type StringObservableOperation = {
  kind: 'string',
  ope: () => Observable<string>
}
type DataObservableOperation = {
  kind: 'data',
  ope: () => Observable<StreamData>
}

type ObservableOperation = StringObservableOperation | DataObservableOperation

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  items: StreamData[] = []
  private stream = new Subject<string>()

  get stream$(): Observable<string> {
    return this.stream.asObservable()
  }

  constructor() { }

  /**
   * ストリームに指定したデータを流します
   * @param x 投入するデータ
   */
  do(x: string) {
    this.stream.next(x)
  }

  /**
   * インジケータに表示するためのデータを追加します
   * @param value
   */
  add(value: IStreamData) {
    this.items.push(
      new StreamData(value)
    )

    // しばらくしたら取り除かれる
    setTimeout(() => {
      this.items.pop()
    }, 100)
  }



  getOperator(name: Operator): ObservableOperation {

    switch (name) {
      case 'of': return { kind: 'string', ope: this.of.bind(this) }
      case 'map': return { kind: 'string', ope: this.xmap.bind(this) }
      case 'filter': return { kind: 'string', ope: this.filter.bind(this) }
      case 'throttleTime': return { kind: 'string', ope: this.throttleTime.bind(this) }
      case 'debounceTime': return { kind: 'string', ope: this.debounceTime.bind(this) }
      case 'distinctUntilChanged': return { kind: 'string', ope: this.distinctUntilChanged.bind(this) }
      case 'merge': return { kind: 'data', ope: this.merge.bind(this) }
      case 'switchMap': return { kind: 'string', ope: this.switchMap.bind(this) }
      case 'skip': return { kind: 'string', ope: this.skip.bind(this) }
      case 'take': return { kind: 'string', ope: this.take.bind(this) }
      case 'finalize': return { kind: 'string', ope: this.finalize.bind(this) }
    }
  }

  // ===================================
  // Operators
  // ===================================
  of(): Observable<string> {
    return this.stream$
  }
  xmap(): Observable<string> {
    return this.stream$
      .pipe(
        map(x => `map: ${x}`)
      )
  }
  filter(): Observable<string> {
    return this.stream$
      .pipe(
        filter(x => x === 'test'),
        map(x => `filter() matched: ${x}`)
      )
  }
  throttleTime(): Observable<string> {
    return this.stream$
      .pipe(
        throttleTime(250),
        map(x => `throttleTime(250): ${x}`)
      )
  }
  debounceTime(): Observable<string> {
    return this.stream$
      .pipe(
        debounceTime(250),
        map(x => `debounceTime(250): ${x}`)
      )
  }
  distinctUntilChanged(): Observable<string> {
    return this.stream$
      .pipe(
        distinctUntilChanged(),
        map(x => `debounceTime(250): ${x}`)
      )
  }
  merge(): Observable<StreamData> {
    return merge(
      interval(1200).pipe(
        take(4),
        map(index => `(a: ${index + 1} / 4)`)
      ),
      interval(500).pipe(
        take(10),
        map(index => `(b: ${index + 1} / 10)`)
      )
    ).pipe(
      map(StreamService.createStreamData)
    )
  }
  switchMap(): Observable<string> {
    return this.stream$
      .pipe(
        switchMap(x => {
          return interval(1000).pipe(
            take(5),
            map(index => `switchMap: ${index} => ${x}`)
          )
        })
      )
  }
  skip(): Observable<string> {
    return this.stream$
      .pipe(
        skip(3),
        map(x => `skip: ${x}`)
      )
  }
  take(): Observable<string> {
    let count = 0
    return this.stream$
      .pipe(
        take(3),
        map(x => `take(${++count}): ${x}`)
      )
  }
  finalize(): Observable<string> {
    return this.stream$
      .pipe(
        switchMap(() => {
          return interval(1000)
            .pipe(
              map(index => `finalize(map): ${index + 1}`),
              take(3),
              finalize(() => {
                setTimeout(() => this.add({ message: 'finalize!'}), 100)
              })
            )
        })
      )
  }

  private static createStreamData(x: string): StreamData {
    const result = new StreamData({
      message: `merge: ${x}`
    })

    if (x.startsWith('(a')) {
      result.color = 'rgb(226, 149, 126)'
    }
    if (x.startsWith('(b')) {
      result.color = 'rgb(126, 226, 134)'
    }

    return result
  }
}
