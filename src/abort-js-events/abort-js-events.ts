import { EventCallback, EventData, Events } from './abort-js-events.types';

export class AbortJSEvents {
	private static readonly events: Events = {
		create: [],
		remove: [],
		abort: [],
	};

	public static addEventTo(event: keyof Events, callback: EventCallback): void {
		if (this.events[event]) {
			this.events[event].push(callback);
		}
	}

	public static emit(event: keyof Events, data: EventData): void {
		if (this.events[event]) {
			this.events[event].forEach(callback => callback(data));
		}
	}

}
