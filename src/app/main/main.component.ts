import { Component, ElementRef, OnInit } from "@angular/core"
import { animate, state, style, transition, trigger } from "@angular/animations"
import { Subscription } from "rxjs"
import { StreamService } from "../services/stream.service"
import { LoggerService } from "../services/logger.service"
import hljs from 'highlight.js'
import { StreamData } from "../models/stream-data.model"
import { Operator, operators } from "../models/operator.model"
import * as KeyCode from 'keycode-js'

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
  $logger: Element | null = null
  $codeBlock: Element | null = null
  operators: Operator[]
  message = 'test'
  source?: Subscription
  selectedOperator?: Operator

  constructor(
    el: ElementRef,
    public streamService: StreamService,
    public loggerService: LoggerService,
  ) {
    this.el = el.nativeElement
    this.operators = [...operators]
  }

  ngOnInit(): void {
    this.$logger = this.el.querySelector('#logger')
    this.$codeBlock = this.el.querySelector('#code-block')

    this.source = this.streamService.of()
      .subscribe(message => {
        this.streamService.add({ message })
      })

    this.selectedOperator = 'of'
    this.highlightCodeBlock()
  }

  log(event: any, data: StreamData) {
    console.log({ event });
  }

  clearLogs() {
    this.loggerService.reset()
  }

  onSelect(event: Event) {
    this.source?.unsubscribe()

    const operator = (event.target as HTMLSelectElement).value as Operator
    if (!operator) return;

    const obj = this.streamService.getOperator(operator)
    if (obj.kind === 'string') {
      obj.ope().subscribe(value => this.streamService.add({ message: value }))
    } else {
      obj.ope().subscribe(value => this.streamService.add(value))
    }

    this.selectedOperator = operator;
    this.highlightCodeBlock()
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key === KeyCode.VALUE_ENTER) {
      this.sendMessage(this.message)
    }
  }

  onEnter(event: MouseEvent) {
    event.preventDefault()
    this.sendMessage(this.message)
  }

  private sendMessage(message: string) {
    message = message.trim()
    if (!message) {
      message = 'blank'
    }
    this.streamService.do(message)
  }

  private highlightCodeBlock() {
    setTimeout(() => {
      const tsBlock = this.$codeBlock?.querySelector<HTMLElement>('.typescript')
      if (tsBlock) {
        hljs.highlightBlock(tsBlock)
      }
    }, 50)
  }

}
