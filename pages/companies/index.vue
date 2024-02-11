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

// set current page
const checkActiveRouteParams = () => {
  queryParams.page = pagination.currentPage = +route.query.page ? +route.query.page : 1;
  queryParams.industry = route.query.industry;
  queryParams.specialization = route.query.specialization;
};

// pagination
const pagination = reactive({
  perPage: 1,
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
});
const setDefinitionParams = (event, queryOption) => {
  queryParams.page = pagination.currentPage = 1;
  queryParams[queryOption.id] = event?.id ?? null;
  fetchCompanies();
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

// get industries and specializations
const fetchDefinitions = () => {
  companiesStore.fetchDefinitions();
};
const getIndustries = computed(() => {
  return companiesStore.industries;
});
const getSpecializacions = computed(() => {
  return companiesStore.specializations;
});

// set activeOptions for filters
const activeSpecialization = computed(() => {
  if (companiesStore.specializations) {
    let specialization = companiesStore.specializations.filter((spec) => (spec.id === +route.query.specialization));
    return specialization;
  }
});

const activeIndustry = computed(() => {
  if (companiesStore.industries) {
    let industry = companiesStore.industries.filter((spec) => (spec.id === +route.query.specialization));
    return industry;
  }
});

// mounted
onMounted(function () {
  checkActiveRouteParams();
  fetchCompanies();
  fetchDefinitions();
});

// test
const searchQuery = (event) => {
  console.log(event.value);
};

//   methods: {
// checkQueryParams() {
//   this.pagination.currentPage = this.$route.query.page ? this.$route.query.page : 1;
//   if (this.$route.query?.search) {
//     this.searchQuery(this.$route.query.search);
//   }
// },
// searchQuery(value) {
//   console.log(value);
//   this.$store.dispatch("fetchCompaniesSearch", [this.pagination.perPage, value]);
// this.$router.push(({ name: "companies", query: { ...this.$route.query, search: value } }))
// this.pushRouteTo({ name: "companies", query: { ...this.$route.query, search: value } });
// },
// pushRouteTo(route) {
//   if (typeof route == "string") {
//     if (this.$route.path != route) {
//       this.$router.push(route);
//     }
//   } else {
//     if (this.$route.name == route.name) {
//       if ("params" in route) {
//         let routesMatched = true;
//         for (let key in this.$route.params) {
//           const value = this.$route.params[key];
//           if (value == null || value == undefined) {
//             if (key in route.params) {
//               if (route.params[key] != undefined && route.params[key] != null) {
//                 routesMatched = false;
//                 break;
//               }
//             }
//           } else {
//             if (key in route.params) {
//               if (route.params[key] != value) {
//                 routesMatched = false;
//                 break;
//               }
//             } else {
//               routesMatched = false;
//               break;
//             }
//           }
//           if (!routesMatched) {
//             this.$router.push(route);
//           }
//         }
//       } else {
//         if (Object.keys(this.$route.params).length != 0) {
//           this.$router.push(route);
//         }
//       }
//     }
//   }
//   },
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
