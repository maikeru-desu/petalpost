import api from './axiosConfig';

export const productTypeService = {
    async getProductTypes() {
        const response = await api.get('/api/product-types');
        return response.data;
    },

    async getProductType(id) {
        const response = await api.get(`/api/product-types/${id}`);
        return response.data;
    }
};
