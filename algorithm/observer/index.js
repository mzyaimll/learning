class Group {
    constructor() {
        this.message = '暂无通知';
        this.parents = [];
    }
    getMessage() { return this.message; } setMassage(message) {
        this.message = message;
        this.notifyAllObservers();
    }
    notifyAllObservers() { this.parents.forEach((parent) => { parent.update(); }); }
    attach(parent) { this.parents.push(parent); }
}
class Parent {
    constructor(name, group) {
        this.name = name;
        this.group = group;
        this.group.attach(this);
    }
    update() { console.log(`${this.name} 收到通知: ${this.group.getMessage()}`); }
}
let group = new Group();
let t1 = new Parent('李妈妈', group);
let t2 = new Parent('王爸爸', group);
let t3 = new Parent('张爷爷', group);
group.setMassage('开家长会');
group.setMassage('开运动会');