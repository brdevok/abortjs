import { EventCallback, EventData, EventsStack } from './events.types';

export class Events {
	private static readonly events: EventsStack = {
		create: [],
		remove: [],
		abort: [],
	};

	public static add(event: keyof EventsStack, callback: EventCallback): void {
		if (this.events[event]) {
			this.events[event].push(callback);
		}
	}

	public static emit(event: keyof EventsStack, data: EventData): void {
		if (this.events[event]) {
			this.events[event].forEach(callback => callback(data));
		}
	}

	public static remove(event: keyof EventsStack, callback: EventCallback): void {
		if (this.events[event]) {
			const index = this.events[event].indexOf(callback);
			
			if (index > -1) {
				this.events[event].splice(index, 1);
			}
		}
	}

}
