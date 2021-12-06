/**
 * 懒汉：初始化的时候不创建实例
 */
let Hourse = (function() {
    let instance;

    function init() {
        return {
            price: [],
            add(data) {
                this.price.push(data)
            }
        }
    }
    return {
        getInstance: () => {
            if (!instance) {
                instance = init()
            }
            return instance
        },
    }
})()

let hs1 = Hourse.getInstance()
let hs2 = Hourse.getInstance()
hs1.add('恒大')
hs2.add('碧桂园')
console.log(hs1.price);


/**
 * 饿汉：初始化的时候创建实例
 */

let Hourse2 = (function() {
    let instance = init()

    function init() {
        return {
            price: [],
            add(data) {
                this.price.push(data)
            }
        }
    }
    return {
        getInstance: () => {
            return instance
        }
    }
})()

let hs3 = Hourse2.getInstance()
let hs4 = Hourse2.getInstance()
hs3.add('万科')
hs4.add('万达')
console.log(hs4.price);