<script setup lang="ts">
import Banner from '@/assets/banner.png';
</script>

<template>
  <div class="home">
    <img :src="Banner" alt="Banner" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.5;
  position: absolute;
}
</style>