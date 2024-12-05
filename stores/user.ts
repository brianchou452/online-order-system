export interface User {
    userID: string
    email: string
    name: string
    profileImageUrl?: string
    position: string
    imageName: string
    phone: string
}



export const useUserStore = defineStore('user', {
    state: (): User => {
        const user = useCurrentUser()
        return {
            userID: user.value?.uid ?? '',
            email: user.value?.email ?? '',
            name: user.value?.displayName ?? '',
            position: 'customer',
            imageName: '',
            profileImageUrl: user.value?.photoURL ?? `https://i.pravatar.cc/150?u=${user.value?.uid}`,
            phone: ''
        }
    },
    actions: {
        updateUser(email: string, name: string) {
            this.email = email
            this.name = name
        },
        logout() {
            this.userID = ''
            this.email = ''
            this.name = ''
            this.position = ''
            this.imageName = ''
            this.profileImageUrl = ''
        },
    }
})