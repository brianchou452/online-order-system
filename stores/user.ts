export interface User {
    userID: string
    email: string
    name: string
    profileImageUrl?: string
    position: string
    imageName: string
}



export const useUserStore = defineStore('user', {
    state: (): User => {
        const user = useCurrentUser()
        return {
            userID: user.value?.uid ?? '',
            email: user.value?.email ?? '',
            name: user.value?.displayName ?? '',
            position: '',
            imageName: '',
            profileImageUrl: user.value?.photoURL ?? '',
        }
    },
    actions: {
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