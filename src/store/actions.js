import { get, post } from "@/http";

// General
export async function getProducts() {
  commit('setProducts', [true]);
  url = url || '/products'
  return get(url)
    .then((response) => {
      console.log(response.data)
      commit('setProducts', [false, response.data])
    })
    .catch(() => {
      commit('setProducts', [false]);
    })
}

export async function getProduct({ commit }, id) {
  return get(`/products/${id}`);
}


// Guest or Verified
export async function register({ commit }, data) {
  return post('/register', data)
    .then(({ token, user }) => {
      commit('setUser', user);
      commit('setToken', token);

      return user;
    })
}

export async function login({ commit }, data) {
  return post('/login', data)
    .then(({ user, token }) => {
      commit('setUser', user);
      commit('setToken', token);
      return { user, token };
    })
}

export async function logout({ commit }) {
  commit('setUser', null);
  commit('setToken', null);
}


// User Info
export async function getOrders({ commit, state }, { url = null, search = '', per_page, sort_field, sort_direction } = {}) {
  commit('setOrders', [true])
  url = url || '/orders'
  const params = {
    per_page: state.orders.limit,
  }
  return get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setOrders', [false, response.data])
    })
    .catch(() => {
      commit('setOrders', [false])
    })
}

export async function getOrder({ commit }, id) {
  return get(`/orders/${id}`)
}

export async function getProfile({ commit }) {
  return get(`/profile`)
    .then((res) => {
      return res;
    });
}


export function updateProfile({ commit }, profile) {
  return put(`/profile/${profile.id}`, profile);
}


// Cart
export function addToCart({ commit }, product) {
  return post('/cart/add/', product);
}

export function removeItemFromCart({ commit }, product) {
  return post('/cart/remove/', product);
}

export function updateQuantity({ commit }, product) {
  return post(`/cart/update-quantity/${product.id}`, product);
}