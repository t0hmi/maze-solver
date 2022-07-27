export class Stack<T> {

    private item : T[] = [];

    push(item : T) {
        this.item.push(item);
    }
    pop() : T | null{
        return this.item.pop()
    }
    peek() : T | null{
        return this.item.length === 0 ? null : this.item[this.item.length - 1]
    }

    isEmpty() : boolean {
        return this.item.length === 0;
    }

}