function Node(element) {
    this.element = element
    this.next = null
}




let linkList = {
    head: new Node('head'),
    find: function(item) {
        let currNode = this.head
        while (currNode.element != item) {
            currNode = currNode.next
        }
        return currNode
    },
    findPre: function(item) {
        let currNode = this.head
        while (currNode.next.element != item) {
            currNode = currNode.next
        }
        return currNode
    },
    insert: function(newElement, item) {
        let newNode = new Node(newElement)
        let current = this.find(item)
        newNode.next = current.next;
        current.next = newNode
    },
    delete: function(item) {
        let current = this.findPre(item)
        current.next = current.next.next
    }
}