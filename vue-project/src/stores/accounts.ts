import { defineStore } from 'pinia'
import type { Account } from '@/types/account'

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        accounts: [] as Account[],
    }),
    actions: {
        addAccount(account: Account) {
            this.accounts.push(account)
            this.saveToLocalStorage()
        },
        updateAccount(updated: Account) {
            this.accounts = this.accounts.map(acc => acc.id === updated.id ? updated : acc)
            this.saveToLocalStorage()
        },
        deleteAccount(id: string) {
            this.accounts = this.accounts.filter(acc => acc.id !== id)
            this.saveToLocalStorage()
        },
        loadFromLocalStorage() {
            const saved = localStorage.getItem('accounts')
            if (saved) this.accounts = JSON.parse(saved)
        },
        saveToLocalStorage() {
            localStorage.setItem('accounts', JSON.stringify(this.accounts))
        }
    }
})
