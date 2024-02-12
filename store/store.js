import { defineStore } from "pinia";

export const store = defineStore("store", {
  state: () => ({
    companies: null,
    companyInfo: null,
    companiesTotalPages: null,
    industries: null,
    specializations: null,
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
  },
  actions: {
    fetchCompanies(queryParams) {
      let url = new URL(`http://api-test.duotek.ru/companies`);
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
        })
        .catch(() => {
          throw createError({
            statusCode: 404,
            statusMessage: "Компаний не найдено. Попробуйте изменить параметры поиска",
          });
        });
    },
    fetchCompanyInfo(id) {
      fetch(`http://api-test.duotek.ru/companies/info?id=${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.companyInfo = res.data;
        })
        .catch(() => {
          throw createError({
            statusCode: 404,
            message: "Такой компании не существует. Попробуйте изменить параметры поиска",
            fatal: true,
          });
        });
    },
    fetchDefinitions() {
      fetch(`http://api-test.duotek.ru/definitions`)
        .then((res) => res.json())
        .then((res) => {
          this.industries = res.Industry;
          this.specializations = res.CompanySpecialization;
        })
        .catch(() => {
          throw createError({
            statusCode: 404,
            message: "Параметры не найдены",
            fatal: true,
          });
        });
    },
  },
});
