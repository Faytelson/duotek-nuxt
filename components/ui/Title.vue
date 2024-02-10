<template>
  <div class="title" :class="getClasses">
    {{ title }}
  </div>
</template>

<script setup>
// props
const { title, styleTypes } = defineProps({
  title: String,
  styleTypes: Object,
});

// get styles by props
const getClasses = computed(() => {
  let classes = [];
  if (styleTypes?.length > 0) {
    styleTypes.forEach((type) => {
      classes.push(`title_${type}`);
    });
  }
  return classes;
});
</script>

<style lang="scss" scoped>
.title {
  &_main {
    @include font($font-main, 36px, 600);
    color: $color-black;
  }

  &_sm {
    @include font($font-main, 18px, 400);
    color: $color-black;
  }
}
</style>
