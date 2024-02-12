<template>
  <div class="error">
    <div class="error__status">{{ error.statusCode }}</div>
    <div class="error__warning">Кажется, что-то пошло не так...</div>
    <div class="error__message">
      {{ error.message }}
    </div>
    <button class="error__button-back" @click="handleClearError">Перейти на домашнюю страницу</button>
  </div>
</template>

<script setup>
defineProps(["error"]);
const handleClearError = () => clearError({ redirect: "/" });
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

  &__button-back {
    @include font($font-main, 20px, 400);
    color: $color-black;
    background-color: $color-light-grey;
    padding: 8px 16px;
    border-radius: 4px;
  }
}
</style>
