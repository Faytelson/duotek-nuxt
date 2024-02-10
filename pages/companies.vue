<template>
  <div class="companies">
    <div class="companies__container">
      <h1 class="companies__title">
        <Title title="Каталог компаний" :styleTypes="['main']"></Title>
      </h1>
      <div class="companies__inner">
        <div class="companies__column">
          <div class="companies__search">
            <InputSearch placeholder="Поиск продукта или отрасли" name="company_search" :id="1" @emitValue="searchQuery"></InputSearch>
          </div>
          <div class="companies__items">
            <!-- <div class="companies__item" v-for="company in getCompanies" :key="company.id">
                  <router-link :to="{ name: 'companyDetail', params: { id: company.id } }">
                    <CompanyLink :companyInfo="company"></CompanyLink>
                  </router-link>
                </div> -->
          </div>
          <!-- <div class="overflow-auto" v-if="getCompanies">
                <b-pagination-nav :link-gen="linkGen" v-model="pagination.currentPage" :number-of-pages="getPaginationLength" align="center" use-router></b-pagination-nav>
              </div> -->
        </div>
        <div class="companies__column">
          <div class="companies__filters">
            <div class="companies__filter-item">
              <div class="companies__filter-item-title">Отрасль</div>
              <div class="companies__filter">
                filter component
                <!-- <FilterComponent label="Все отрасли" :optionsList="getIndustries" @emitValue="filterItems"></FilterComponent> -->
              </div>
            </div>
            <div class="companies__filter-item">
              <div class="companies__filter-item-title">Специализация</div>
              <div class="companies__filter">
                filter component
                <!-- <FilterComponent label="Все специализации" :optionsList="getSpecs" @emitValue="filterItems"></FilterComponent> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from "~/components/ui/Title.vue";
import InputSearch from "~/components/ui/InputSearch.vue";

// test
const searchQuery = (event) => {
    console.log(event.value)
}
</script>

<style lang="scss" scoped>
.companies {
  padding-top: 75px;
  padding-bottom: 44px;

  &__container {
    @include container;
  }

  &__title {
    margin-bottom: 18px;
  }

  &__inner {
    display: grid;
    grid-template-columns: 792px 264px;
    justify-content: space-between;
  }

  &__item {
    margin-bottom: 30px;
  }

  &__search {
    margin-bottom: 38px;
  }

  &__filters {
    width: 100%;
    background-color: $color-ultra-light-grey;
    border-radius: 4px;
    padding: 18px 20px;
  }

  &__filter-item-title {
    @include font($font-main, 16px, 400);
    color: $color-black;
    margin-bottom: 16px;
  }

  &__filter-item {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
