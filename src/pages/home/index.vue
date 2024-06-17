<script setup lang="ts">
import Banner from '@/assets/banner.png';
import { renderFadeIn } from '@/fadeIn';
import { dom } from 'jsfast';
import { onMounted } from 'vue';

onMounted(() => {
  renderFadeIn();
  dom.select(".list a")?.set("target", "_blank");
});
</script>

<template>
  <div class="home">
    <img :src="Banner" alt="Banner" />
    <h1 fade-in="200">Hi, I'm XiaoDong</h1>
    <div class="list" fade-in="1200">
      <a href="https://resume.xiaodong.moe/">About Me</a>
      <a href="https://github.com/xiaodong2008">GitHub</a>
      <a href="https://twitter.com/dy_xiaodong">Twitter</a>
      <a href="https://xlog.xiaodong.moe">Blog</a>
      <a href="mailto:hi@xiaodong.moe">Email</a>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
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

.list {
  display: flex;
  gap: 20px;
}
</style>