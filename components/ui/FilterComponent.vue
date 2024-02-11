<template>
  <div class="filter" tabindex="0" @blur="closeOptions">
    <div class="filter__header" @click="handleOptions">
      <div v-if="!filterValue" class="filter__label-field">
        <p class="filter__label">{{ label }}</p>
      </div>
      <div v-else class="filter__value">
        <input type="text" v-model="getActiveOption.title">
      </div>
      <span class="filter__arrow"></span>
      <button class="filter__close" v-if="filterValue" @click="removeOption"></button>
    </div>
    <ul class="filter__options" v-if="showOptions">
      <li class="filter__option" v-for="opt in optionsList" :key="opt.id" @click="handleChosenOption(opt)">{{ opt.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false,
      filterValue: null,
    };
  },
  props: {
    optionsList: Array,
    label: String,
    activeOption: Object,
  },
  emits: ["emitValue"],
  computed: {
    getActiveOption() {
      if (this.activeOption) {
        let active = JSON.parse(JSON.stringify(this.activeOption));
        this.filterValue = active[0].title;
        return active[0];
      }
    },
  },
  methods: {
    handleOptions() {
      this.showOptions = !this.showOptions;
    },
    closeOptions() {
      this.showOptions = false;
    },
    handleChosenOption(opt) {
      this.filterValue = opt.title;
      this.handleOptions();
      this.$emit("emitValue", opt);
    },
    removeOption() {
      this.filterValue = null;
      this.$emit("emitValue", null);
    },
  },
};
// import { ref } from "vue";
// props
// const { optionsList, label, activeOption } = defineProps({
//   optionsList: Array,
//   label: String,
//   activeOption: Object,
// });

// handle options list
// const showOptions = ref(false);
// const handleOptions = () => {
//   showOptions.value = !showOptions.value;
// };
// const closeOptions = () => {
//   showOptions.value = false;
// };

// filter value
// const emits = defineEmits(["emitValue"]);
// const filterValue = ref(null);
// const handleChosenOption = (opt) => {
//   filterValue.value = opt.title;
//   handleOptions();
//   emits("emitValue", opt);
// };
// const removeOption = () => {
//   filterValue.value = null;
//   emits("emitValue", null);
// };

// set active option
// const getActive = computed(() => {
//   return activeOption;
// });
</script>

<style lang="scss" scoped>
.filter {
  position: relative;

  &__header {
    height: 40px;
    border-radius: 8px;
    background-color: $color-white;
    padding: 9px 16px;
    cursor: pointer;
    position: relative;
  }

  &__label {
    @include font($font-main, 14px, 400);
    color: $color-black;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    width: 24px;
    height: 100%;
    background: url("@/assets/images/icon_arrow_down.png") center / contain no-repeat;
  }

  &__close {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
    width: 14px;
    height: 100%;
    background: url("@/assets/images/icon_close.png") center / contain no-repeat;
  }

  &__options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: auto;
    padding: 8px 12px;
    border-radius: 4px;
    z-index: 2;
    background-color: $color-white;
    border: 1px solid $color-light-grey;
  }

  &__option {
    margin-bottom: 10px;
    cursor: pointer;
  }

  &__value {
    pointer-events: none;
    max-height: 100%;
    overflow: hidden;
  }
}
</style>
