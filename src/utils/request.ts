const API_BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL
const API_NEXTSERVER = process.env.NEXT_PUBLIC_NEXTSERVER_URL

interface TOption{
    method: string,
    credentials: RequestCredentials,
    body: string | FormData | null,
    headers?: HeadersInit
}

export const _get = async (path: string) => {
    const response = await fetch(API_BACKEND + path, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        cache: "no-store"
    })
    return response
}

export const _post = async (path: string, data?: any) => {
    const isFormData = data instanceof FormData;
    const options: TOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: data
    };

    if (!isFormData) {
        options.headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        options.body = JSON.stringify(data)
    }

    const response = await fetch(API_BACKEND + path, options)
    return response
}

export const _post_nextserver = async (path: string, data?: any) => {
    const isFormData = data instanceof FormData;
    const options: TOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: data
    };

    if (!isFormData) {
        options.headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        options.body = JSON.stringify(data)
    }

    const response = await fetch(API_NEXTSERVER + path, options)
    return response
}

export const _patch = async (path: string, data: any) => {
    const isFormData = data instanceof FormData;
    const options: TOption = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: data
    }

    if (!isFormData) {
        options.headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        options.body = JSON.stringify(data)
    }

    const response = await fetch(API_BACKEND + path, options)
    return response
}


export const _delete = async (path: string) => {
    const response = await fetch(API_BACKEND + path, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    return response
}
