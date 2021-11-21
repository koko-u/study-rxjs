import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StreamService } from '../../services/stream.service';
import { Operator, operators } from '../../models/operator.model';
import { Subscription } from 'rxjs';
import * as KeyCode from 'keycode-js'

@Component({
  selector: 'app-stream-form',
  templateUrl: './stream-form.component.html',
  styleUrls: ['./stream-form.component.scss']
})
export class StreamFormComponent implements OnInit {

  operators: Operator[]
  message = 'test'
  source?: Subscription
  selectedOperator?: Operator

  @Output()
  changeOperator = new EventEmitter<Operator>()

  constructor(
    private streamService: StreamService,
  ) {
    this.operators = [...operators]
  }

  ngOnInit(): void {
    this.source = this.streamService.of()
      .subscribe(message => {
        this.streamService.add({ message })
      })

    this.selectedOperator = 'of'
    this.changeOperator.emit(this.selectedOperator)
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

    this.selectedOperator = operator
    this.changeOperator.emit(operator)
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
}
