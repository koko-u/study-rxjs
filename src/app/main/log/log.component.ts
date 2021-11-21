import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  $logger: Element | null = null
  $ul: Element | null = null

  @Input()
  logSubject$?: Subject<void>

  constructor(
    private el: ElementRef,
    public loggerService: LoggerService,
  ) { }

  ngOnInit(): void {
    this.$logger = this.el.nativeElement.querySelector('#logger')
    this.$ul = this.$logger?.querySelector('ul') ?? null
    if (this.logSubject$) {
      this.logSubject$.subscribe(() => {
        if (this.$logger && this.$ul) {
          this.$logger.scrollTop = this.$ul.clientHeight - 130;
        }
      })
    }
  }

  clearLogs() {
    this.loggerService.reset();
  }
}
