import { MessageContextType } from "@/contexts/message-context";

export const copy = async (url: string, message: MessageContextType) => {
    try {
        await navigator.clipboard.writeText(url);
        message.showMessage("Sao chép thành công", "success")
    } catch (err) {
        message.showMessage("Có lỗi xảy ra", "error")
    }
}