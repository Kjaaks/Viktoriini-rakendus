<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <button @click="closeModal">Sulge</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'FeedBackModal',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    },
    emits: ['close'],
    setup(props, { emit }) {
      const closeModal = () => {
        emit('close');
      };
  
      return {
        closeModal
      };
    }
  });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  