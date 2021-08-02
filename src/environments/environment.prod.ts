
export const environment = {
  production: true,

  owner: {
    host: 'http://localhost:8080/api/owner'
  },

  client: {
    host: 'http://localhost:8080/api/client'
  },

  business: {
    host: 'http://localhost:8080/api/business'
  },

  product: {
    host: 'http://localhost:8080/api/product',
    hostFilter: 'http://localhost:8080/api/product/filter-products/'
  },

  bill: {
    host: 'http://localhost:8080/api/bill',
    update: 'http://localhost:8080/api/bill-client'
  }


};
