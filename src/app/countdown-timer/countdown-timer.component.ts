import {Component, OnInit, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

  constructor() {
  }

  private interValid = 0;
  message = '';
  remainingTime: number | undefined;
  @Input() seconds = 60;

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
    this.message = `${this.remainingTime} giây`;
  }

  reset(): void {
    this.clearTime();
    this.remainingTime = this.seconds;
    this.message = `Nhấp vào nút bắt đầu để bắt đầu đếm ngược`;
  }

  countDown(): void {
    this.clearTime();
    this.interValid = window.setInterval(() => {
      // @ts-ignore
      this.remainingTime -= 1;
      // tslint:disable-next-line:triple-equals
      if (this.remainingTime == 0) {
        this.message = 'Mở ra!';
        this.clearTime();
        this.start();
      } else {
        this.message = `${this.remainingTime} giây`;
      }
    }, 1000);
  }

}
