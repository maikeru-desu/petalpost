import { useQuery } from "@tanstack/react-query"
import { productTypeService } from "../api/productTypeService"

export const useProductTypes = () => {
    return useQuery({
        queryKey: ['productTypes'],
        queryFn: () => productTypeService.getProductTypes(),
    })
}

export const useProductType = (id) => {
    return useQuery({
        queryKey: ['productType', id],
        queryFn: () => productTypeService.getProductType(id),
        enabled: !!id, // Only run query if id is provided
    })
}
