<script setup lang="ts">
import Banner from '@/assets/banner.png';
import { renderFadeIn } from '@/fadeIn';
import { onMounted } from 'vue';

onMounted(() => {
  renderFadeIn();
});
</script>

<template>
  <div class="home">
    <img :src="Banner" alt="Banner" />
    <h1 fade-in="200">Hi, I'm XiaoDong</h1>
    <div>
      <a>GitHub</a>
      <a>Twitter</a>
    </div>
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
  opacity: 0.3;
  position: absolute;
  z-index: -1;
}
</style>