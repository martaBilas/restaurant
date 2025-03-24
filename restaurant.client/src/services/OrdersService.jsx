import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = "https://localhost:7135/api/";

// export const getOrdersList = async (skip, take, requireTotalCount) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}Admin/getOrders?skip=${skip}&take=${take}&requireTotalCount=${requireTotalCount}`,
//       {
//         withCredentials: true,
//       }
//     );
//     return response;
//   } catch (error) {
//     console.error("Error during fetching user orders:", error);
//   }
// };

export const getOrdersList = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}Admin/getOrders`,
            {
                withCredentials: true,
            }
        );
        return response;
    } catch (error) {
        console.error("Error during fetching admin orders:", error);
    }
};

export const getFullOrderByIdAsync = async (orderId) => {
    try {
        console.log("Fetching order with ID:", orderId);
        const response = await axios.get(`${BASE_URL}Order/GetFullOrderByIdAsync/${orderId}`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("Error during fetching full order by id:", error);
        return null;
    }
};

export const updateOrderStatus = async (orderId, statusId, changedById) => {
    try {
        const response = await axios.put(`${BASE_URL}Order/UpdateOrderStatus`, {
            orderId,
            orderStatusId: statusId,
            changedById,
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating user password: ${error}`);
        throw error;
    }
};