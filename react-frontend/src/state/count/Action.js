import axios from 'axios';
import { API_URL } from '../../config/API';
import { getCountsStart, getCountsSuccess, getCountsFailure } from './countSlice';

export const fetchAllCounts = () => async (dispatch) => {
    dispatch(getCountsStart());

    try {
        const token = localStorage.getItem('token');

        const headers = {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        };

        const userRes = await axios.get(`${API_URL}/users/count`, headers);
        const orderRes = await axios.get(`${API_URL}/orders/count`, headers);
        const bookRes = await axios.get(`${API_URL}/books/count`, headers);
        const discountRes = await axios.get(`${API_URL}/discounts/count`, headers);

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
