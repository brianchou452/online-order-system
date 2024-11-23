import {
    addDoc,
    collection
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useUserStore, type User } from './user'


export interface Item {
    categoryID: string
    imageUrl: string
    imagekey: string
    name: string
    price: number
}

interface CartItem {
    categoryID: string
    imageUrl: string
    imagekey: string
    name: string
    price: number
    quantity: number
}

interface Orders {
    user: User
    items: CartItem[]
    total: number
    status: string
    createdAt: Date
    updatedAt: Date
}




export const useCartStore = defineStore('cart', {
    state: () => ({
        cartItems: [] as CartItem[],
        storeID: '' as string,
        isOpen: false as boolean,
    }),
    getters: {
        totalAmount(): number {
            return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        }
    },
    actions: {
        addItem(item: Item) {
            const i = this.cartItems.findIndex((x) => x.name === item.name) // FIXME: use ID
            if (i > -1) {
                this.cartItems[i].quantity++
            } else {
                this.cartItems.push({ ...item, quantity: 1 })
            }
        },

        removeItem(item: Item) {
            const i = this.cartItems.findIndex((x) => x.name === item.name) // FIXME: use ID
            if (i > -1) {
                this.cartItems[i].quantity--
                if (this.cartItems[i].quantity === 0) {
                    this.cartItems.splice(i, 1)
                }
            }
        },

        clearCart() {
            this.cartItems = []
        },

        hasItem(item: Item): boolean {
            return this.cartItems.some((x) => x.name === item.name) // FIXME: use ID
        },

        async purchaseItems() {
            const db = useFirestore();
            const user = useUserStore()

            console.log('cart user', user.$state)
            await addDoc(collection(db, 'stores', this.storeID, 'orders'), <Orders>{
                user: { ...user.$state },
                items: this.cartItems,
                total: this.totalAmount,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: 'pending',
            })
            this.clearCart()
        },
    },
})