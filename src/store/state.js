export default {
  // TODO: apply TS

  user: {
    token: sessionStorage.getItem('TOKEN'),
    data: JSON.parse(sessionStorage.getItem('USER_INFO'))
  },
  products: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
  },
  orders: {
    loading: false,
    data: []
  },
  toast: {
    show: false,
    message: '',
    delay: 2000
  }
}
