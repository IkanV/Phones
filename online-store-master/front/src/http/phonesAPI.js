import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data;
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type');
    return data;
}

export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/type/'+id});
    return data;
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand);
    return data;
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand');
    return data;
}

export const deleteBrand = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/brand/'+id});
    return data;
}

export const createPhones = async (brand) => {
    const {data} = await $authHost.post('api/phones', brand);
    return data;
}

export const fetchPhones = async (typeId, brandId, sort, page, limit = 9, searchName = '') => {
    console.log(typeId);
    const {data} = await $host.get('api/phones', {params: {
            typeId, brandId, page, limit, searchName, sort
        }});
    return data;
}

export const fetchOnePhones = async (id) => {
    const {data} = await $host.get(`api/phones/${id}`);
    console.log(data)
    return data;
}

export const fetchDeletePhones = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/phones/${id}`});
    return data;
}

export const updateClothing = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/phones/${id}`, data: body});
    return data;
}

export const getAllClothingInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authHost({method:'GET', url:`api/phones/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}

export const addPhonesToBasket = async (phones) => {
    const {data} = await $authHost.post('api/basket', phones);
    return data;
}

export const getPhonesFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deletePhonesFromBasket = async (id) => {
    const {data} = await $authHost.delete(`api/basket/${id}`);
    return data;
}

export const addRating = async (body) => {
    const {data} = await $authHost.post('api/rating', body);
    return data;
}

export const checkRating = async (body) => {
    const {data} = await $authHost.post('api/rating/check-rating', body);
    return data;
}
