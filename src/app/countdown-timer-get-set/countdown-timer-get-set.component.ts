import {Component, OnInit, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-countdown-timer-get-set',
  templateUrl: './countdown-timer-get-set.component.html',
  styleUrls: ['./countdown-timer-get-set.component.scss']
})
export class CountdownTimerGetSetComponent implements OnInit, OnDestroy {
  constructor() {
  }

  private interValid = 0;
  message = '';
  remainingTime: number | undefined;
  // tslint:disable-next-line:variable-name
  private _seconds = 60;
  @Input()
  get seconds(): number {
    return this._seconds;
  }

  set seconds(seconds) {
    // tslint:disable-next-line:triple-equals
    seconds = typeof seconds == 'undefined' ? 11 : seconds;
    const secondsFixed = Number(seconds);
    this._seconds = Number.isNaN(secondsFixed) ? 11 : secondsFixed;
  }

  ngOnDestroy(): void {
    this.clearTime();
  }

  ngOnInit(): void {
    this.reset();
    this.start();
  }

  clearTime(): void {
    clearInterval(this.interValid);
  }

  start(): void {
    this.countDown();
    // @ts-ignore
    if (this.remainingTime <= 0) {
      this.remainingTime = this.seconds;

    }
  }

  stop(): void {
    this.clearTime();
    this.message = `${this.remainingTime}giây`;
  }

  reset(): void {
    this.clearTime();
    this.remainingTime = this.seconds;
    this.message = `Nhấp vào nút bắt đầu để bắt đầu đếm ngược `;
  }

  countDown(): void {
    this.clearTime();
    this.interValid = window.setInterval(() => {
      // @ts-ignore
      this.remainingTime -= 1;
      // tslint:disable-next-line:triple-equals
      if (this.remainingTime == 0) {
        this.message = 'Mở a!';
        this.clearTime();
        this.start();
      } else {
        this.message = `${this.remainingTime}giây `;
      }
    }, 1000);
  }

}
