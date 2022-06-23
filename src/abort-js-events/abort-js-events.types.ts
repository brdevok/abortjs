export interface EventData {
	controller: string;
}

export type EventCallback = (data: EventData) => void;

export interface Events {
	create: Array<EventCallback>;
	remove: Array<EventCallback>;
	abort: Array<EventCallback>;
}

