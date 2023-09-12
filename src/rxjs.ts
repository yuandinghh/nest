//import { Observable } from 'rxjs';
import { of,Observable, interval, take, fromEvent } from 'rxjs';
import { map, filter, reduce, find, findIndex } from 'rxjs/operators';

// const click$ = fromEvent(document,'click');  //点击事件
// click$.subscribe((e) => {  //订阅
//     console.log(e);  //输出点击事件
// });   nest 不支持 document


const subs = interval(500)   //execute every 500ms exaple 0 1 2 3 4 5 6 7 8 9 10
  // .of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)   
  .pipe(   //管道
    map((v) => ({ num: v })),  //map 用来处理数据
    filter((v) => v.num % 2 == 0),  //filter 用来过滤数据  输出偶数 0 2 4 6 8 10
  )
  .subscribe((e) => {  //订阅
    console.log(e);   //0 2 4 6 8 10
    if (e.num == 10) {  //take 用来限制数量
      subs.unsubscribe();  //取消订阅
    }
  });


//类似于迭代器 next 发出通知  complete通知完成
const observable = new Observable((subscriber) => {  //创建一个可观察的物件
  subscriber.next(1);  //发出通知
  subscriber.next(2);   //发出通知
  subscriber.next(3);

  setTimeout(() => {  //延迟1秒
    subscriber.next(4);  //发出通知
    subscriber.complete();  //通知完成
  }, 1000);  //延迟1秒
});

observable.subscribe({  //订阅
  next: (value) => {    //接收通知
    console.log(value);   //1 2 3 4
  },
});


/*
 概念
RxJs 使用的是观察者模式，用来编写异步队列和事件处理。

Observable 可观察的物件

Subscription 监听Observable

Operators 纯函数可以处理管道的数据 如 map filter concat reduce 等
类似于迭代器 next 发出通知  complete通知完成

subscribe 订阅  observable  发出的通知 也就是一个观察者
 */