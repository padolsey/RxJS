  // References
  var Observable = Rx.Observable,
    observableProto = Observable.prototype,
    AnonymousObservable = Rx.AnonymousObservable,
    AbstractObserver = Rx.internals.AbstractObserver,
    CompositeDisposable = Rx.CompositeDisposable,
    BinaryDisposable = Rx.BinaryDisposable,
    Notification = Rx.Notification,
    Subject = Rx.Subject,
    Observer = Rx.Observer,
    disposableEmpty = Rx.Disposable.empty,
    disposableCreate = Rx.Disposable.create,
    inherits = Rx.internals.inherits,
    addProperties = Rx.internals.addProperties,
    defaultScheduler = Rx.Scheduler['default'],
    currentThreadScheduler = Rx.Scheduler.currentThread,
    identity = Rx.helpers.identity,
    isScheduler = Rx.Scheduler.isScheduler,
    isFunction = Rx.helpers.isFunction,
    checkDisposed = Rx.Disposable.checkDisposed;
