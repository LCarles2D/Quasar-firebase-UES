<template>
  <q-page class="q-pa-md">
    <q-btn @Click='onLogin' label="Inicia sesión" color="teal" />
    <q-btn @Click="onLogout" label="Cerrar seión" color="primary"/>
        <q-card v-if="usuario" style="width: 350px">
          <q-card-section>
            <q-avatar>
              <img :src="usuario.photoURL" />
            </q-avatar>
          </q-card-section>

          <q-card-section>
            <div class="text-h6">{{ usuario.displayName }}</div>
            <div class="text-subtitle2">{{ usuario.email }}</div>
          </q-card-section>

          <q-card-actions>
            <q-btn to="/Perfil" color="secondary" label="Perfil" push size="sm" />
          </q-card-actions>
        </q-card>
  </q-page>
</template>

<script setup>
  import { onMounted, ref } from "vue"
  import { auth, provider } from "src/boot/firebase";
  import {  signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

    const usuario = ref(null)
  const debug = ref("")

function onLogin(){

  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // The signed-in user info.
    usuario.value = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // The AuthCredential type that was used.
    // ...
  });

};

function onLogout(){
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("Deslogeado correctamente");
    usuario.value = null;
  }).catch((error) => {
    // An error happened.
    console.log("hubo un error");
});
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuario.value = user;
    }
    });
});

</script>
