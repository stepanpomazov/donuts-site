export default class Cart {
    constructor(storageKey = 'cart') {
        this.storageKey = storageKey;
        this.cart = this.loadCart();
    }

    loadCart() {
        const cartData = localStorage.getItem(this.storageKey);
        return cartData ? JSON.parse(cartData) : {};
    }

    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    }

    addItem(productId, productData, count = 1) {
        if (this.cart[productId]) {

            this.cart[productId].count += count;
        } else {

            this.cart[productId] = {
                ...productData,
                count
            };
        }
        this.saveCart();
    }

    removeItem(productId) {
        delete this.cart[productId];
        this.saveCart();
    }


    updateCount(productId, count) {
        if (this.cart[productId]) {
            if (count <= 0) {

                delete this.cart[productId];
            } else {
                this.cart[productId].count = count;
            }
            this.saveCart();
        }
    }

    clearCart() {
        this.cart = {};
        this.saveCart();
    }

    getItems() {
        return this.cart;
    }

    getTotalCount() {
        return Object.values(this.cart).reduce((total, item) => total + item.count, 0);
    }

    getTotalPrice() {
        return Object.values(this.cart).reduce((total, item) => total + item.count * item.price, 0);
    }
}