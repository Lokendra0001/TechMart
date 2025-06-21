import { toast } from "react-toastify"

const handleSuccessMsg = (message, id) => {
    toast.success(message, { containerId: id })
}

const handleErrorMsg = (message, id) => {
    toast.error(message, { containerId: id })
}

export { handleSuccessMsg, handleErrorMsg };