  /**
   *  Time shifts the observable sequence by delaying the subscription with the specified relative time duration, using the specified scheduler to run timers.
   *
   * @example
   *  1 - res = source.delaySubscription(5000); // 5s
   *  2 - res = source.delaySubscription(5000, Rx.Scheduler.default); // 5 seconds
   *
   * @param {Number} dueTime Relative or absolute time shift of the subscription.
   * @param {Scheduler} [scheduler]  Scheduler to run the subscription delay timer on. If not specified, the timeout scheduler is used.
   * @returns {Observable} Time-shifted sequence.
   */
  observableProto.delaySubscription = function (dueTime, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = defaultScheduler);
    return new AnonymousObservable(function (o) {
      var d = new SerialDisposable();

      d.setDisposable(scheduler.scheduleFuture(null, dueTime, function() {
        d.setDisposable(source.subscribe(o));
      }));

      return d;
    }, this);
  };
