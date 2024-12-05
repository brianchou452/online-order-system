<script lang="ts" setup>
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const db = useFirestore();
const user = useCurrentUser();
const userStore = useUserStore();

const {
  public: { vuefireVersion, nuxtVuefireVersion },
} = useRuntimeConfig();

const router = useRouter();
const route = useRoute();

useHead({
  title: "線上點餐系統",
  meta: [{ name: "description", content: "線上點餐系統" }],
  bodyAttrs: {
    class: "test",
  },
});

watch(user, async (currentUser, previousUser) => {
  // redirect the user if they are logged in but were rejected because the user wasn't ready yet
  if (currentUser && typeof route.query.redirect === "string") {
    return router.push(route.query.redirect);
  }

  // update user info
  if (currentUser) {
    console.log("Updating user info...");
    userStore.updateUser(
      user.value?.email ?? "",
      user.value?.displayName ?? ""
    );
    const userDoc = doc(db, "users", currentUser.uid);
    const userData = {
      userID: currentUser.uid,
      name: currentUser.displayName || "Anonymous",
      profileImageUrl: currentUser.photoURL || "",
      email: currentUser.email || "",
    };

    // fallback photo for dev with emulators or anonymous users
    if (currentUser.isAnonymous || import.meta.dev) {
      userData.name ??= "Anonymous";
      userData.profileImageUrl ??= `https://i.pravatar.cc/150?u=${currentUser.uid}`;

      updateProfile(currentUser, {
        displayName: userData.name,
        photoURL: userData.profileImageUrl,
      });
    }

    // only create entries for real users
    if (!currentUser.isAnonymous) {
      const existingUser = await getDoc(userDoc);

      if (existingUser.exists()) {
        await updateDoc(userDoc, userData);
      } else {
        await setDoc(userDoc, {
          ...userData,
          phone: "",
          position: "",
          imageName: "",
        });
      }
      console.log("User updated");
    }
  }
});
</script>

<template>
  <NuxtPage />
</template>
