import axios from 'axios';
import { securedApi } from '../../config/API';
import { getCountsStart, getCountsSuccess, getCountsFailure } from './countSlice';

export const fetchAllCounts = () => async (dispatch) => {
    dispatch(getCountsStart());

    try {
        const userRes = await securedApi.get(`/users/count`);
        const orderRes = await securedApi.get(`/orders/count`);
        const bookRes = await securedApi.get(`/books/count`);
        const discountRes = await securedApi.get(`/discounts/count`);

        dispatch(getCountsSuccess({
            users: userRes.data.count,
            orders: orderRes.data.count,
            books: bookRes.data.count,
            discounts: discountRes.data.count,
        }));
    } catch (error) {
        console.error('Failed to fetch counts:', error);
        dispatch(getCountsFailure(error.message || 'Failed to fetch counts'));
    }
};
