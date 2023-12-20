import "./style.css";
import { Observable } from "rxjs";

function createCountStream(num: number) {
  return new Observable<number>((subscriber) => {
    for (let i = 0; i < num; i++) {
      wait(i * 1000).then(() => subscriber.next(i));
    }
    wait(num * 1001).then(() => subscriber.complete());
  });
}

function main() {
  let sum = 0;
  const stream$ = createCountStream(10);
  stream$.subscribe({
    next(val) {
      sum += val;
      console.log(`有新資料, val=${val}, sum=${sum}`);
    },
    complete() {
      console.log("流已經結束, sum=", sum);
    },
  });
}
main();

async function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
