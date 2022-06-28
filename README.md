# AbortJs :scissors:

Small implementation of AbortController API for easy management of requests cancelation in modern browsers, fully typed in Typescript.

## Quick start with `watch()` method

Import the package where you need it.

```javascript
const Abort = require('abortjs');
```

or

```javascript
import Abort from 'abortjs';
```

Then make use of the `watch()` method for automatic cancelation of the request on re-calls.

The `watch` method requires a unique string name and a callback containing your fetch, the string will be used to as an identifier of the `AbortController` created for the callback, you can access the `signal` of that controller from the callback parameter.

If you repeat the controller name in another part of your code, you may be leading to unwanted cancelations.

```javascript
Abort.watch('my-controller', (signal) => fetch('...', { signal: signal }));
```

You can store the value of your fetch returning it from the callback.

```javascript
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
const response = await Abort.watch('my-controller', async (signal) => await fetch('...', { signal }));
```

Now you fetchs will be aborted automatically every time your code repeats the sequence.

## The `watchAll()` method

If you want to make several requests and have control of all them, you can make use of the `watchAll()` method.
It accepts an array of 2 items arrays, the first item is a controller unique name, and the second is a callback.

```javascript
const responses = await Abort.watchAll([
	['controller-1', (signal) => fetch('...', { signal })],
	['controller-2', (signal) => fetch('...', { signal })],
	['controller-3', (signal) => fetch('...', { signal })],
	['controller-4', (signal) => fetch('...', { signal })],
]);
```

The return is an object containing the results of each callback labeled by it's controller name.

```javascript
await responses['controller-1'] // results of ['controller-1', (signal) => fetch('...', { signal })]
await responses['controller-2'] // results of ['controller-2', (signal) => fetch('...', { signal })]
await responses['controller-3'] // results of ['controller-3', (signal) => fetch('...', { signal })]
await responses['controller-4'] // results of ['controller-4', (signal) => fetch('...', { signal })]
```

## Events

AbortJs has events that fires every time something related to a controller happens, [see how manage them](#on(event, callback)).

Current event names:

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

