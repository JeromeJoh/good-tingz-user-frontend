import { useStore, Store } from "vuex";

export interface IUseCart {
  addToCart: () => void,
  removeItemFromCart: () => void,
  changeQuantity: () => void,
}

function useCart(): IUseCart {
  
  const store: Store<any> = useStore();

  function addToCart(): void {
    
  };

  function removeItemFromCart(): void {

  };

  function changeQuantity(): void {

  };

  return {
    addToCart,
    removeItemFromCart,
    changeQuantity,
  }
}

export default {
  useCart,
}