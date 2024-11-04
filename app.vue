<script lang="ts" setup>
import { updateProfile } from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const db = useFirestore()
const user = useCurrentUser()

const {
  public: { vuefireVersion, nuxtVuefireVersion },
} = useRuntimeConfig()

const router = useRouter()
const route = useRoute()
watch(user, async (currentUser, previousUser) => {
  // redirect the user if they are logged in but were rejected because the user wasn't ready yet
  if (currentUser && typeof route.query.redirect === 'string') {
    return router.push(route.query.redirect)
  }

  // update user info
  if (currentUser) {
    console.log('Updating user info...')
    const userDoc = doc(db, 'users', currentUser.uid)
    const userData = {
      displayName: currentUser.displayName || 'Anonymous',
      photoURL: currentUser.photoURL,
      lastLogin: serverTimestamp(),
    }

    // fallback photo for dev with emulators or anonymous users
    if (currentUser.isAnonymous || import.meta.dev) {
      userData.displayName ??= 'Anonymous'
      userData.photoURL ??= `https://i.pravatar.cc/150?u=${currentUser.uid}`

      updateProfile(currentUser, {
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      })
    }

    // only create entries for real users
    if (!currentUser.isAnonymous) {
      const existingUser = await getDoc(userDoc)

      if (existingUser.exists()) {
        await updateDoc(userDoc, userData)
      } else {
        await setDoc(userDoc, {
          ...userData,
          joinedAt: serverTimestamp(),
        })
      }
      console.log('User updated')
    }
  }
})
</script>

<template>
  <NuxtPage />
</template>
