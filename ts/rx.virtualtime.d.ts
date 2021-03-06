declare module Rx {

    export module internals {
        // Priority Queue for Scheduling
        export interface PriorityQueue<TTime> {
            length: number;

            isHigherPriority(left: number, right: number): boolean;
            percolate(index: number): void;
            heapify(index: number): void;
            peek(): ScheduledItem<TTime>;
            removeAt(index: number): void;
            dequeue(): ScheduledItem<TTime>;
            enqueue(item: ScheduledItem<TTime>): void;
            remove(item: ScheduledItem<TTime>): boolean;
        }

        interface PriorityQueueStatic {
                new <T>(capacity: number) : PriorityQueue<T>;
                count: number;
        }

        export var PriorityQueue : PriorityQueueStatic;
    }

    export interface VirtualTimeScheduler<TAbsolute, TRelative> extends IScheduler {
        /**
         * Adds a relative time value to an absolute time value.
         * @param {Number} absolute Absolute virtual time value.
         * @param {Number} relative Relative virtual time value to add.
         * @return {Number} Resulting absolute virtual time sum value.
         */
        add(from: TAbsolute, by: TRelative): TAbsolute;

        /**
         * Converts an absolute time to a number
         * @param {Any} The absolute time.
         * @returns {Number} The absolute time in ms
         */
        toDateTimeOffset(duetime: TAbsolute): number;

        /**
         * Converts the TimeSpan value to a relative virtual time value.
         * @param {Number} timeSpan TimeSpan value to convert.
         * @return {Number} Corresponding relative virtual time value.
         */
        toRelative(duetime: number): TRelative;

        /**
         * Starts the virtual time scheduler.
         */
        start(): IDisposable;

        /**
         * Stops the virtual time scheduler.
         */
        stop(): void;

        /**
         * Advances the scheduler's clock to the specified time, running all work till that point.
         * @param {Number} time Absolute time to advance the scheduler's clock to.
         */
        advanceTo(time: TAbsolute): void;

        /**
         * Advances the scheduler's clock by the specified relative time, running all work scheduled for that timespan.
         * @param {Number} time Relative time to advance the scheduler's clock by.
         */
        advanceBy(time: TRelative): void;

        /**
         * Advances the scheduler's clock by the specified relative time.
         * @param {Number} time Relative time to advance the scheduler's clock by.
         */
        sleep(time: TRelative): void;

        isEnabled: boolean;

        /**
         * Gets the next scheduled item to be executed.
         * @returns {ScheduledItem} The next scheduled item.
         */
        getNext(): internals.ScheduledItem<TAbsolute>;
    }

    export interface HistoricalScheduler extends VirtualTimeScheduler<number, number> {
    }

    export var HistoricalScheduler: {
        /**
         * Creates a new historical scheduler with the specified initial clock value.
         * @constructor
         * @param {Number} initialClock Initial value for the clock.
         * @param {Function} comparer Comparer to determine causality of events based on absolute time.
         */
        new (initialClock: number, comparer: ((value1: number, value2: number) => number)): HistoricalScheduler;
    };

}
declare module "rx.virtualtime" { export = Rx; }
