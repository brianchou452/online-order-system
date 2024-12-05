<script lang="ts">
import { GoogleAuthProvider } from "firebase/auth";
export const googleAuthProvider = new GoogleAuthProvider();
</script>

<script lang="ts" setup>
import { getRedirectResult, signInWithPopup } from "firebase/auth";
import {
  useCurrentUser,
  useFirebaseAuth,
  useIsCurrentUserLoaded,
} from "vuefire";

const auth = useFirebaseAuth()!; // only exists on client side
const user = useCurrentUser();
const isUserLoaded = useIsCurrentUserLoaded();

function signinPopup() {
  error.value = null;
  signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    console.error("Failed signinPopup", reason);
    error.value = reason;
  });
}

// display errors if any
const error = ref<Error | null>(null);
// only on client side
onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error("Failed redirect result", reason);
    error.value = reason;
  });
});
</script>

<template>
  <ErrorBox v-if="error" :error="error" />

  <template v-if="user">
    <strong>你好，{{ user.displayName }}.</strong>
  </template>

  <template v-else>
    <UButton
      v-bind:loading="!isUserLoaded"
      icon="i-bx:bxl-google"
      size="md"
      block
      @click="signinPopup()"
    >
      使用 Google 帳號登入
    </UButton>
  </template>
</template>
