export class Queue<T> {
    private items : T[] = [];

    push(item : T) {
        this.items.push(item)
    }

    pop() : T | null {
        return this.items.shift();
    }

    peek() : T | null {
        return this.items.length === 0 ? null : this.items[0];
    }

    isEmpty() : boolean {
        return this.items.length === 0;
    }
}