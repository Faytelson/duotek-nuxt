<template>
  <div class="error">
    <div class="error__status">{{ error.statusCode }}</div>
    <div class="error__warning">Кажется, что-то пошло не так...</div>
    <div class="error__message">
      {{ error.message }}
    </div>
  </div>
</template>

<script setup>
defineProps(["error"]);
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-top: 150px;

  &__status {
    @include font($font-main, 70px, 700);
    color: $color-black;
  }

  &__warning {
    @include font($font-main, 30px, 700);
    color: $color-black;
  }

  &__message {
    @include font($font-main, 20px, 400);
    color: $color-black;
  }
}
</style>
