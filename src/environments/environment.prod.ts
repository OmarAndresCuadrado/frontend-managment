
export const environment = {
  production: true,

  owner: {
    host: 'http://3.137.213.20:8085/api/owner'
  },

  client: {
    host: 'http://3.137.213.20:8085/api/client'
  },

  business: {
    host: 'http://3.137.213.20:8085/api/business'
  },

  product: {
    host: 'http://3.137.213.20:8085/api/product',
    hostFilter: 'http://3.137.213.20:8085/api/product/filter-products/'
  },

  bill: {
    host: 'http://3.137.213.20:8085/api/bill',
    update: 'http://3.137.213.20:8085/api/bill-client'
  }


};
