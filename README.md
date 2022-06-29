# AbortJs :scissors:

Small implementation of AbortController API for easy management of requests cancelation in modern browsers, fully typed in Typescript.

 * [What it does](#what-it-does)
 * [Quick start](#quick-start)
 * [Aborting multiple requests](#aborting-multiple-requests)
 * [Events](#events)
 * [Current event names](#current-event-names)
 * [Complete API](#complete-api)
 * [Links](#links)

## What it does?

AbortJs was created to facilitate the use of abort controllers in your code, it provides to the user a set of tools with a clean interface to easily manage the cancelation of requests withot relying in additional lines of code but with quick integration.

## Quick start

Import the package where you need it.

```javascript
const Abort = require('abortjs');
```

or

```javascript
import Abort from 'abortjs';
```

Then you can make use of the `watch()` method to start working with requests and abort controllers at once.

The `watch` method requires two arguments, the first is a string that will be used as an identifier and give a name to the controller that is going to be created, the second is a callback containing the signal of the created controller as an argument.
You can write your requests inside of the callback and pass the signal, then every time your code repeats the sequence, the controller related to that signal will be aborted before running the callback again.

```javascript
Abort.watch('my-controller', (signal) => fetch('...', { signal: signal }));
```

If needed, you can store the value of your fetchs returning it from the callback or using promises.

```javascript
// Using promises
const response = new Promise((resolve, reject) => {
	Abort.watch('my-controller', (signal) => {
		fetch('...', { signal})
			.then(response => resolve(response))
			.catch(err => reject(err))
	});
});
```

or using `async await`

```javascript
// Using async await)
const response = await Abort.watch('my-controller', async (signal) => await fetch('...', { signal }));
```

Note that if you repeat the name of the controller (`'my-controller'` in this case), it may cause unwanted aborts in your code, make sure you are using unique strings values for every watch, unless you want to override the callback.

## Aborting multiple requests

If you want to make several requests and have control of all of them, you can make use of the `watchAll()` method.
It accepts an array of two items arrays, these two items works exactly like the `watch()` method parameters just above, the first is a string with the controller name and the second a callback with the signal.

```javascript
const responses = await Abort.watchAll([
	['controller1', (signal) => fetch('...', { signal })],
	['controller2', (signal) => fetch('...', { signal })],
	['controller3', (signal) => fetch('...', { signal })],
	['controller4', (signal) => fetch('...', { signal })],
]);
```

All callbacks will be executed in the same order they are placed.
An object with the controller names will be returned, each name is a key and it's value corresponds to the result of the callback.

```javascript
await responses.controller1 // results of ['controller-1', (signal) => fetch('...', { signal })]
await responses.controller2 // results of ['controller-2', (signal) => fetch('...', { signal })]
await responses.controller3 // results of ['controller-3', (signal) => fetch('...', { signal })]
await responses.controller4 // results of ['controller-4', (signal) => fetch('...', { signal })]
```

## Events

AbortJs is equiped with a set of events that fires every time something related to a controller happens, to access these events you can make use of the `on()` method.

The `on(event, callback)` receives two arguments, the first is the event name that want to be listened, the second is a callback that will be executed when the event fires. Also the callback provides an object containing data of the controller that fired the event.

```javascript
Abort.on('create', (e) => console.log(e.controller));
```

Now every time a controller is created (i.e. calling `watch`, `watchAll`, or `create`), it will log the name of the controller.

#### Current event names

 * `'create'` - Every time a controller is created.
 * `'remove'` - Every time a controller is removed.
 * `'abort'` - Every time a controller is aborted.

## Complete API

#### `watch(name, callback)`

 * `name: string` - Name for the controller, must be unique to avoid unwanted cancelations.
 * `callback: (signal: AbortSignal) => Promise<unknown> | unknown` - Callback containing the signal of the controller.

Run the contentes inside of the callback and abort it's signal related controller every time it's called more than once. Returns the callback results if there is any.

#### `watchAll(collection)`

 * `collection: Array<[string, (signal: AbortSignal) => Promise<unknown> | unknown]>` - Array of controller names and callbacks, each one managed individually.

Run the contentes inside of every item, it returns an object containing all controllers names as keys and their corresponding callback returns.

#### `create(name)`

 * `name: string` - Name of the controller to create.

Create a new controller.

#### `get(name)`

 * `name: string` - Name of the controller.

Return a controller with that name.

#### `abort(name)`

 * `name: string` - Name of the controller to abort.

Abort a controller with that name.

#### `remove(name, abort)`

 * `name: string` - Name of the controller to remove.
 * `abort?: boolean` - Boolean value for abort management.

Remove a controller with that name, if `abort` is `true`, then it will aborted before deletion. Default is `false`.

#### `clean(abort)`

 * `abort?: boolean` - Abort or not all controllers.

Remove all controllers, if `abort` is `true` then all controllers will be aborted before deletion.

#### `on(event, callback)`

 * `event: string` - Name of the event.
 * `callback: (event: { controller: string }) => void` = Callback to run when event fires.

Add an event handler for the defined event name. When fired, the callback will contain an object with the controller name that fired it.


#### `removeEvent(event, callback)`

 * `event: string` - Name of the event.
 * `callback: (event: { controller: string }) => void` = Function to be removed.

Remove the event handler from the event scope defined in the name.

#### Links

- [Github](https://github.com/brdevok/abortjs)

