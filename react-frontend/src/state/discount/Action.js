import {
    createDiscountFailure, createDiscountStart, createDiscountSuccess,
    deleteDiscountFailure, deleteDiscountStart, deleteDiscountSuccess,
    editDiscountFailure, editDiscountStart, editDiscountSuccess,
    getAllDiscountsFailure, getAllDiscountsStart, getAllDiscountsSuccess,
    getDiscountByBookIdFailure, getDiscountByBookIdStart, getDiscountByBookIdSuccess,
    updateDiscountStatusFailure, updateDiscountStatusStart, updateDiscountStatusSuccess,
} from './discountSlice'
import { securedApi } from '../../config/API';

export const createDiscount = (discount) => async (dispatch) => {
    dispatch(createDiscountStart());

    try {
        const response = await securedApi.post('/discounts/createDiscount', discount);
        const data = response.data;
        dispatch(createDiscountSuccess(data));
    } catch (error) {
        console.error("Create discount error:", error.message);
        dispatch(createDiscountFailure(error.message));
    }

}


export const getAllDiscounts = () => async (dispatch) => {
    dispatch(getAllDiscountsStart());
    try {
        const response = await securedApi.get('/discounts/getAllDiscounts');
        const data = response.data;
        dispatch(getAllDiscountsSuccess(data));
    } catch (error) {
        dispatch(getAllDiscountsFailure(error.message));
    }
};


export const editDiscount = (discountId, updatedData) => async (dispatch) => {

    dispatch(editDiscountStart());
    try {
        const response = await securedApi.put(`/discounts/editDiscount/${discountId}`, updatedData);

        const data = response.data;
        dispatch(editDiscountSuccess(data));
    } catch (error) {
        dispatch(editDiscountFailure(error.message));
    }
};


export const updateDiscountStatusById = (id, active) => async (dispatch) => {
    dispatch(updateDiscountStatusStart());

    try {
        const response = await securedApi.put(`/discounts/updateStatus/${id}`, { active });
        const data = response.data;
        dispatch(updateDiscountStatusSuccess(data.discount));
    } catch (error) {
        console.error('Update Discount Status Error:', error);
        dispatch(updateDiscountStatusFailure(error.message));
    }
};


export const findDiscountByBookId = (bookId) => async (dispatch) => {
    dispatch(getDiscountByBookIdStart());
    try {

        const response = await securedApi.get(`/discounts/byBook/${bookId}`);
        const data = response.data;
        dispatch(getDiscountByBookIdSuccess(data));
    } catch (error) {
        dispatch(getDiscountByBookIdFailure(error.message));
    }
};

export const deleteDiscountById = (id) => async (dispatch) => {
    dispatch(deleteDiscountStart());
    try {

        const response = await securedApi.delete(`/discounts/${id}`);

        const data = response.data;

        dispatch(deleteDiscountSuccess(data));
    } catch (error) {
        alert(`${error.message}`);
        dispatch(deleteDiscountFailure(error.message));
    }
};
