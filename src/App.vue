<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style scoped>
@keyframes page-enter {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes page-leave {
  from {
    opacity: 1;
    transform: translateX(0px);
  }

  to {
    opacity: 0;
    transform: translateX(10px);
  }
}

.page-enter-active {
  animation: page-enter 0.3s;
}

.page-leave-active {
  animation: page-leave 0.3s;
}
</style>
