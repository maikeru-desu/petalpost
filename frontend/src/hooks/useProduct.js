import { useQuery } from "@tanstack/react-query"
import { productService } from "../api/productService"

export const useProducts = (filters = {page: 1, per_page: 6}) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: () => productService.getProducts(filters),
    })
}

export const useProduct = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getProduct(id),
        enebled: !!id,
    })
}