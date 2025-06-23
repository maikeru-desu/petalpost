import api from './axiosConfig';

export const productService = {
    async getProducts(filters) {
        const response = await api.get('/api/products', { params: filters });
        return response.data;
    },

    async getProduct(id) {
        const response = await api.get(`/api/products/${id}`);
        return response.data.data;
    },

    // TODO: Implement the following methods to Admin Side
    // async createProduct(product) {
    //     const response = await api.post('/api/products', product);
    //     return response.data;
    // },

    // async updateProduct(id, product) {
    //     const response = await api.put(`/api/products/${id}`, product);
    //     return response.data;
    // },

    // async deleteProduct(id) {
    //     const response = await api.delete(`/api/products/${id}`);
    //     return response.data;
    // }
}