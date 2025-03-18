<template>
  <div class="home">
    <div class="title-area">
    <h1 class="main-title">Viktoriin</h1>
   </div>
    <div class="content-background">
      <div class="content-box">
        <h2>Tere tulemast viktoriinirakendusse!</h2>
        <p>Klõpsake alloleval nupul, et alustada.</p>
        <button @click="startQuiz" class="button-details">Alusta viktoriini</button>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'HomePage',
    setup() {
      const router = useRouter();
      const startQuiz = () => {
        router.push('/quiz');
      };
  
      return { startQuiz };
    }
  });
  </script>
