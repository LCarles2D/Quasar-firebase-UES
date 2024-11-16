<template>
  <q-page class="q-pa-md">
      <q-expansion-item
        style="border-radius: 25px;"
        class="bg-primary text-white"
        icon="add"
        expand-icon="null"
        label="Agregar">
         <div class="bg-white q-pa-md text-dark rounded-borders">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
                >

                <q-input
                  color="primary"
                  v-model="nuevoAnuncio.title"
                  outlined
                  label="Titulo"

                  />

                 <q-input
                    v-model="nuevoAnuncio.description"
                    type="textarea"
                    label="Descripción"
                    outlined
                    maxlength="300"
                    :rows="5"
                    :counter="true"
                    hint="Máximo 300 caracteres"
                    lazy-rules
                    :rules="[val => val.length <= 300 || 'Máximo 300 caracteres']"
                  />

                <q-input
                    v-model="nuevoAnuncio.price"
                    type="number"
                    label="Precio"
                    outlined
                  >
                  <template v-slot:prepend>
                    <q-icon name="attach_money"/>
                  </template>
                </q-input>
                <div class="row justify-center">
                  <q-btn color="primary" type="Submit" label="Agregar"/>
                </div>
              </q-form>
           </div>
       </q-expansion-item>

       <div class="row q-gutter-md q-pa-md q-mt-md items-start">
          <q-card v-for="(item, key) in anuncios" :key="key" class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">
            <q-card-section>
              <div class="text-h6">{{item.title}}</div>
              <div class="text-subtitle2">{{item.description}}</div>
            </q-card-section>

            <q-card-actions class="q-pt-none">
              <div class="text-subtitle1">Precio: {{item.price}}</div>
              <q-space/>
              <q-btn to="/editat/jsksk"
                     flat
                     icon="edit"
                     color="primary"
                     size="sm"
                />
              <q-btn @click="onDelete(item.id)" icon="delete" color="red" size="sm"/>
            </q-card-actions>
          </q-card>
       </div>
  </q-page>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
  import { db } from "boot/firebase"
  import { useCollection } from 'vuefire'

  const nuevoAnuncio = ref({
    title: "",
    description: "",
    price: 0.0,
    imgURL: ""
  });

  const anuncios = useCollection(collection(db, 'anuncios'))
/*
  const anuncios = ref([
  {
    title: "anuncio 1",
    description: "muy versatil",
    price: 12.00,
    imgURL: "https://genero.ues.edu.sv/wp-content/uploads/sites/48/2024/02/Logo-UES-2-150x150.png"
  },
  {
    title: "anuncio2",
    description: "poco versatil, pero eficiente",
    price: 15.00,
    imgURL: "https://genero.ues.edu.sv/wp-content/uploads/sites/48/2024/02/Logo-UES-2-150x150.png"
  }
  ]);
*/
  function onReset(){
   nuevoAnuncio.value = {
            title: "",
            description: "",
            price: 0.0
       };

  };

 async function onSubmit(){
    console.log("nuevo anuncio, agregado.: "+nuevoAnuncio.value);
    try {
      const docRef = await addDoc(collection(db, "anuncios"), nuevoAnuncio.value );
      onReset()
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

async function onDelete(id) {
  //borrar anuncio
  console.log(`elimando anuncio id: ${id}`)
  await deleteDoc(doc(db, "anuncios", id));
}

defineOptions({
  name: 'IndexPage'
});
</script>
