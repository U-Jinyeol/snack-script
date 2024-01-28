import dayjs from "dayjs";

export const formatDate = (dateString: string | Date) => {
  return dayjs(dateString).format("YYYY-MM-DD HH:mm:ss");
};
