import { MessageContext } from "@/contexts/message-context";
import { useContext } from "react";

export default function useMessage(){
    return useContext(MessageContext)
}