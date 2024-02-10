<template>
  <div class="page">
    <div class="page__header">
      <Header></Header>
    </div>

    <div class="page__main">
      <slot />
    </div>
    <div class="page__footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script setup>
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";
</script>

<style lang="scss" scoped></style>
