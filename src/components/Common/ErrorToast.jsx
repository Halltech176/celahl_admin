import { toast } from "react-toastify";
export const ErrorNotification = (err) => toast.error(err);

export const SuccessNotification = (res) => toast.success(res);

export const InfoNotification = (res) => toast.info(res);
