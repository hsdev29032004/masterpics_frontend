const API = "http://localhost:3001/api"

interface TOption{
    method: string,
    credentials: RequestCredentials,
    body: string | FormData | null,
    headers?: HeadersInit
}

export const _get = async (path: string) => {
    const response = await fetch(API + path, {
        method: 'GET',
        credentials: 'include'
    })
    return response
}

export const _post = async (path: string, data?: any) => {
    const isFormData = data instanceof FormData;
    const options: TOption = {
        method: "POST",
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

    const response = await fetch(API + path, options)
    return response
}

export const _patch = async (path: string, data: any) => {
    const isFormData = data instanceof FormData;
    const options: TOption = {
        method: "PATCH",
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

    const response = await fetch(API + path, options)
    return response
}


export const _delete = async (path: string) => {
    const response = await fetch(API + path, {
        method: "DELETE",
        credentials: 'include'
    })
    return response
}
