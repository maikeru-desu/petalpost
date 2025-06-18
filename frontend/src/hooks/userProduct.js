import { useQuery } from "@tanstack/react-query"
import { productService } from "../api/productService"

export const useProducts = (page = 1, limit = 6, filters = {}) => {
    return useQuery({
        queryKey: ['products', page, limit, filters],
        queryFn: () => productService.getProducts({page, limit, ...filters}),
    })
}