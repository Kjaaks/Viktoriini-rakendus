<template>
    <div class="home">
      <h1>Viktoriin</h1>
      <h2> Tere tulemast viktoriinirakendusse! </h2>
      <p>Klõpsake alloleval nupul, et alustada.</p>
      
      <button @click="startQuiz" class="button-details">
        Alusta viktoriini
      </button>

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
  
  <style scoped>
  h1 {
    font-size: 8rem;
    font-weight: bolder;
    margin-top: 5px;
    color: #000000;
    flex: auto;
  }
  
  h2 {
    font-size: 2.8rem;
    font-weight: bold;
    color: #8f8f8f;
    margin-top: 10px;
  }
  
  p {
    font-size: 1.8rem;
    font-weight: lighter;
    color: #8f8f8f;
    margin-top: 10px;
  }
  
  .home {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  