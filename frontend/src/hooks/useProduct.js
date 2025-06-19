import { useQuery } from "@tanstack/react-query"
import { productService } from "../api/productService"

export const useProducts = (filters = {page: 1, limit: 6}) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: () => productService.getProducts(filters),
    })
}