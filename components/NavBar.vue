<template>
  <nav class="navbar">
    <div>
        <router-link to="/" class="nav-icon">
             <UIcon name="i-lucide-house" class="size-10 home-icon" />
        </router-link>

    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #000000;
  width: 100vw;
  color: white;
  padding: 4px 10px;
}

.home-icon {
  font-size: 1.6rem;
  color: white;
  margin-top: 4px;
}

</style>
