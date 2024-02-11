import { defineStore } from "pinia";

export const store = defineStore("store", {
  state: () => ({
    companies: null,
    companyInfo: null,
    companiesTotalPages: null,
    industries: null,
    specializations: null,
    filteredItems: null,
  }),
  getters: {
    GET_COMPANIES() {
      return this.companies;
    },
    GET_COMPANY_INFO() {
      return this.companyInfo;
    },
    GET_COMPANIES_TOTAL_PAGES() {
      return this.companiesTotalPages;
    },
    GET_INDUSTRIES() {
      return this.industries;
    },
    GET_SPECS() {
      return this.specializations;
    },
    GET_FILTERED_ITEMS() {
      return this.filteredItems;
    },
  },
  actions: {
    fetchCompanies(queryParams, args) {
      const [page, per_page] = args;
      let url = new URL(`http://api-test.duotek.ru/companies?page=${page}&per_page=${per_page}`);
      for (let param in queryParams) {
        if (queryParams[param]) {
          url.searchParams.set(param, queryParams[param]);
        }
      }
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          this.companies = res.data;
          this.companiesTotalPages = res.meta.total;

          if (res.data.length <= 0) {
            throw new Error("Page not found");
          }
        });
    },
    fetchCompanyInfo(id) {
      fetch(`http://api-test.duotek.ru/companies/info?id=${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.companyInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchDefinitions() {
      fetch(`http://api-test.duotek.ru/definitions`)
        .then((res) => res.json())
        .then((res) => {
          this.industries = res.Industry;
          this.specializations = res.CompanySpecialization;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // fetchCompaniesFilter(args) {
    //   const [specializations, industries] = args;
    //   fetch(`http://api-test.duotek.ru/companies?specializations=${specializations}&industries=${industries}`)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       this.companyInfo = res.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // fetchCompaniesSearch(args) {
    //   const [per_page, searchQuery] = args;
    //   fetch(`http://api-test.duotek.ru/companies?per_page=${per_page}&search=${searchQuery}`)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       this.companies = res.data;
    //       this.companiesTotalPages = res.meta.total;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
});
