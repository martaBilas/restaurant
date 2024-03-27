import { useReducer, createContext, useContext } from "react";
import { orderReducer } from "./OrderReducer";

const initailOrder = { meals: [], total: 0 };
const OrderContext = createContext(initailOrder);
const OrderDispatchContext = createContext(null);

export function OrderProvider({ children }) {
  const [order, dispatch] = useReducer(orderReducer, initailOrder);
  console.log('I should work after dispatch:', order);  
  
  return (
    <OrderContext.Provider value={order}>
      <OrderDispatchContext.Provider value={dispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderContext.Provider>
  );
}

export function useOrder() {
    const order = useContext(OrderContext);
    console.log("useOrder - Order:", order);
    return order;
}

export function useOrderDispatch(){
    const dispatch = useContext(OrderDispatchContext);
    console.log("useOrderDispatch - Dispatch:", dispatch);
    return dispatch;
}
