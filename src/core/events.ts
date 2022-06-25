import { EventCallback, EventData, EventsStack } from './events.types';

export class Events {
	private static readonly events: EventsStack = {
		create: [],
		remove: [],
		abort: [],
	};

	public static addEventTo(event: keyof EventsStack, callback: EventCallback): void {
		if (this.events[event]) {
			this.events[event].push(callback);
		}
	}

	public static emit(event: keyof EventsStack, data: EventData): void {
		if (this.events[event]) {
			this.events[event].forEach(callback => callback(data));
		}
	}

}
