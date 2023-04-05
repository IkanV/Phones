import { $authHost, $host } from "./index";

export const fetchChatRooms = async (page, limit = 10) =>
{

    const { data } = await $authHost.get('api/chat', {
        params: {
            limit,page
        }
    })
    return data
}
export const fetchChatRoom = async (id) => {
    const { data } = await $authHost.get('api/chat/' + id)
    return data
}