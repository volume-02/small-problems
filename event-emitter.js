class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, cb) {
    this.events.set(
      event,
      this.events.has(event) ? [...this.events.get(event), cb] : [cb]
    );
  }

  off(event, cb) {
    this.events.set(
      event,
      this.events.get(event).filter((e) => e === cb)
    );
  }

  emit(event) {
    if (!this.events.has(event)) {
      console.log('no such event');
      return;
    }
    this.events.get(event).forEach((e) => e());
  }
}

const e = new EventEmitter();
const cb = () => console.log(1);

e.on('test', cb);
e.on('test', () => console.log(2));
e.emit('test'); // 1, 2
e.off('test', cb);
e.emit('test'); // 2

e.on('123', () => console.log(123));
e.emit(123);
