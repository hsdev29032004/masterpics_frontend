export type TResponse<T = any> = {
    status: "error" | "success";
    message: string;
    data: T;
}