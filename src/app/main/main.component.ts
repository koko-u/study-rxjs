import { Component, ElementRef, OnInit } from "@angular/core"
import { AnimationEvent, animate, state, style, transition, trigger } from "@angular/animations"
import { StreamService } from "../services/stream.service"
import { LoggerService } from "../services/logger.service"
import hljs from 'highlight.js'
import { StreamData } from "../models/stream-data.model"
import { Operator } from '../models/operator.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('itemState', [
      state('in', style({ left: 0 })),
      transition('void => *', [
        style({ left: '-30px' }),
        animate(100),
      ]),
      transition('* => void', [
        animate(1000, style({ left: '100%' }))
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  el: HTMLElement
  $codeBlock: Element | null = null
  selectedOperator?: Operator
  logSubject$: Subject<void>

  constructor(
    el: ElementRef,
    public streamService: StreamService,
    public loggerService: LoggerService,
  ) {
    this.el = el.nativeElement
    this.logSubject$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.$codeBlock = this.el.querySelector('#code-block')
  }

  log(event: AnimationEvent, data: StreamData) {
    if (event.fromState === null) {
      this.loggerService.add(data);
    }

    this.logSubject$.next()
  }

  private highlightCodeBlock() {
    setTimeout(() => {
      const tsBlock = this.$codeBlock?.querySelector<HTMLElement>('.typescript')
      if (tsBlock) {
        hljs.highlightBlock(tsBlock)
      }
    }, 50)
  }

  onChangeOperator(operator: Operator) {
    this.selectedOperator = operator;
    this.highlightCodeBlock()
  }
}
