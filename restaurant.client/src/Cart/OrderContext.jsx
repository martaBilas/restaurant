import { useReducer, createContext, useContext } from "react";
import { orderReducer } from "./OrderReducer";

const OrderContext = createContext(null);
const OrderDispatchContext = createContext(null);

const initailOrder = { meals: [], total: 0 };

export function OrderProvider({ children }) {
  const [order, dispatch] = useReducer(orderReducer, initailOrder);

  return (
    <OrderContext.Provider value={order}>
      <OrderDispatchContext.Provider value={dispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}

export function useOrderDispatch(){
    return useContext(OrderDispatchContext)
}
