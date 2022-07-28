export class Stack<T> {

    private items : T[] = [];

    push(item : T) {
        this.items.push(item);
    }
    pop() : T | null{
        return this.items.pop()
    }
    peek() : T | null{
        return this.items.length === 0 ? null : this.items[this.items.length - 1]
    }

    isEmpty() : boolean {
        return this.items.length === 0;
    }

}