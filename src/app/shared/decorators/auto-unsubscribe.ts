const isFunction = (fn: any) => typeof fn === 'function';

const doUnsubscribe = (subscription: any) => {
  if (subscription && isFunction(subscription.unsubscribe)) {
    // console.log('doUnsubscribe', subscription);
    subscription.unsubscribe();
  }
};

const doUnsubscribeIfArray = (subscriptionsArray: any) => {
  Array.isArray(subscriptionsArray) &&
    subscriptionsArray.forEach(doUnsubscribe);
};

export function AutoUnsubscribe({
  blackList = [],
  arrayName = '',
  event = 'ngOnDestroy',
} = {}) {
  return function (constructor: Function) {
    const original = constructor.prototype[event];

    if (!isFunction(original)) {
      throw new Error(
        `${constructor.name} is using @AutoUnsubscribe but does not implement ${event}`
      );
    }

    constructor.prototype[event] = function () {
      isFunction(original) && original.apply(this, arguments);

      if (arrayName) {
        doUnsubscribeIfArray(this[arrayName]);
        return;
      }

      for (let propName in this) {
        if (blackList.includes(propName as never)) continue;

        const property = this[propName];
        doUnsubscribe(property);
      }
    };
  };
}
