<template>
  <div class="companies">
    <div class="companies__container">
      <h1 class="companies__title">
        <Title title="Каталог компаний" :styleTypes="['main']"></Title>
      </h1>
      <div class="companies__inner">
        <div class="companies__column">
          <div class="companies__search">
            <InputSearch placeholder="Поиск продукта или отрасли" name="company_search" :id="1" :activeSearch="activeSearch" @emitValue="searchCompaniesByName"></InputSearch>
          </div>
          <div class="companies__items">
            <div class="companies__item" v-for="company in getCompanies" :key="company.id">
              <NuxtLink :to="`/companies/${company.id}`">
                <CompanyLink :companyInfo="company"></CompanyLink>
              </NuxtLink>
            </div>
          </div>
          <v-pagination v-model="pagination.currentPage" @update:modelValue="fetchPaginated" :length="getPaginationLength" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
        </div>
        <div class="companies__column">
          <div class="companies__filters">
            <div class="companies__filter-item">
              <div class="companies__filter-item-title">Отрасль</div>
              <div class="companies__filter">
                <FilterComponent label="Все отрасли" :optionsList="getIndustries" :activeOption="activeIndustry" @emitValue="setDefinitionParams($event, { id: 'industry' })"></FilterComponent>
              </div>
            </div>
            <div class="companies__filter-item">
              <div class="companies__filter-item-title">Специализация</div>
              <div class="companies__filter">
                <FilterComponent label="Все специализации" :optionsList="getSpecializacions" :activeOption="activeSpecialization" @emitValue="setDefinitionParams($event, { id: 'specialization' })"></FilterComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { store } from "~/store/store";
import Title from "~/components/ui/Title.vue";
import InputSearch from "~/components/ui/InputSearch.vue";
import CompanyLink from "~/components/CompanyLink.vue";
import FilterComponent from "~/components/ui/FilterComponent.vue";

// store
const companiesStore = store();

// router
const router = useRouter();
const route = useRoute();

// pagination
const pagination = reactive({
  perPage: 5,
  currentPage: 1,
});
const getPaginationLength = computed(() => {
  let total = companiesStore.companiesTotalPages;
  return Math.ceil(total / pagination.perPage);
});
const fetchPaginated = () => {
  queryParams.page = pagination.currentPage;
  queryParams.per_page = pagination.perPage;
  fetchCompanies();
};

// set query params
const queryParams = reactive({
  page: pagination.currentPage,
  per_page: pagination.perPage,
  industry: null,
  specialization: null,
  search: null,
});

// check existing query params
const checkActiveRouteParams = () => {
  queryParams.page = pagination.currentPage = +route.query.page ? +route.query.page : 1;
  queryParams.industry = route.query.industry;
  queryParams.specialization = route.query.specialization;
  queryParams.search = route.query.search;
};

// get companies
const fetchCompanies = () => {
  companiesStore.fetchCompanies(queryParams);
  const query = {};
  for (const param in queryParams) {
    if (queryParams[param]) {
      query[param] = queryParams[param];
    }
  }
  router.push({
    name: "companies",
    path: "/companies",
    query,
  });
};
const getCompanies = computed(() => {
  return companiesStore.companies;
});

// industries and specializations
const fetchDefinitions = () => {
  companiesStore.fetchDefinitions();
};
const getIndustries = computed(() => {
  return companiesStore.industries;
});
const getSpecializacions = computed(() => {
  return companiesStore.specializations;
});
const setDefinitionParams = (event, queryOption) => {
  queryParams.page = pagination.currentPage = 1;
  queryParams[queryOption.id] = event?.id ?? null;
  fetchCompanies();
};

// search by name
const searchCompaniesByName = (event) => {
  if (event.value.length > 1 || event.value.length === 0) {
    queryParams.search = event.value;
    fetchCompanies();
  }
};

// set activeOptions for filters and search
const activeIndustry = computed(() => {
  if (companiesStore.industries) {
    let industry = companiesStore.industries.filter((spec) => spec.id === +route.query.industry);
    return industry;
  }
});
const activeSpecialization = computed(() => {
  if (companiesStore.specializations) {
    let specialization = companiesStore.specializations.filter((spec) => spec.id === +route.query.specialization);
    return specialization;
  }
});
const activeSearch = computed(() => {
  return route.query.search;
});

// mounted
onMounted(function () {
  checkActiveRouteParams();
  fetchCompanies();
  fetchDefinitions();
});
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
