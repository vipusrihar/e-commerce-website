import {
    createDiscountFailure, createDiscountStart, createDiscountSuccess,
    deleteDiscountFailure, deleteDiscountStart, deleteDiscountSuccess,
    editDiscountFailure, editDiscountStart, editDiscountSuccess,
    getAllDiscountsFailure, getAllDiscountsStart, getAllDiscountsSuccess,
    getDiscountByBookIdFailure, getDiscountByBookIdStart, getDiscountByBookIdSuccess,
    updateDiscountStatusFailure, updateDiscountStatusStart, updateDiscountStatusSuccess,
} from './discountSlice'
import { API_URL } from '../../config/API';

export const createDiscount = (discount) => async (dispatch) => {
    dispatch(createDiscountStart());
    console.log("creating discount");

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/discounts/createDiscount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ discount }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed tocreate discount');
        }

        const data = await response.json();
        console.log("order Created :", data)
        dispatch(createDiscountSuccess(data));
        console.log("discount created successfully:", data);
    } catch (error) {
        console.error("Create discount error:", error.message);
        dispatch(createDiscountFailure(error.message));
    }

}


export const getAllDiscounts = () => async (dispatch) => {
    dispatch(getAllDiscountsStart());
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/discounts/getAllDiscounts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch discounts');
        }
        const data = await response.json();
        console.log("All discounts ", data)
        dispatch(getAllDiscountsSuccess(data));
    } catch (error) {
        dispatch(getAllDiscountsFailure(error.message));
    }
};


export const editDiscount = (discountId, updatedData) => async (dispatch) => {
    console.log('discount Id', discountId);
    console.log("data", updatedData)
    dispatch(editDiscountStart());
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/discounts/editDiscount/${discountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to update discount');
        }
        const data = await response.json();
        dispatch(editDiscountSuccess(data));
    } catch (error) {
        dispatch(editDiscountFailure(error.message));
    }
};


export const updateDiscountStatusById = (id, active) => async (dispatch) => {
    dispatch(updateDiscountStatusStart());

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/discounts/updateStatus/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ active }), // shorthand is fine
        });

        const data = await response.json();
        console.log('Update Status Response:', data);

        if (!response.ok) {
            alert(data.message || 'Failed to update discount status')
            throw new Error(data.message || 'Failed to update discount status');
        }

        dispatch(updateDiscountStatusSuccess(data.discount));
    } catch (error) {
        console.error('Update Discount Status Error:', error);
        dispatch(updateDiscountStatusFailure(error.message));
    }
};


export const findDiscountByBookId = (bookId) => async (dispatch) => {
    dispatch(getDiscountByBookIdStart());
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/discounts/byBook/${bookId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to find discount by book ID');
        }
        const data = await response.json();
        console.log(data);
        dispatch(getDiscountByBookIdSuccess(data));
    } catch (error) {
        dispatch(getDiscountByBookIdFailure(error.message));
    }
};

export const deleteDiscountById = (id) => async (dispatch) => {
    dispatch(deleteDiscountStart());
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/discounts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json(); 

        if (!response.ok) {
            throw new Error(data.error || data.message || 'Failed to delete discount');
        }

        dispatch(deleteDiscountSuccess(data));
    } catch (error) {
        alert(`${error.message}`);
        dispatch(deleteDiscountFailure(error.message));
    }
};
