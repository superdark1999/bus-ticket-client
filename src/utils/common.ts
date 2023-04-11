const getTime = (duration: number): { hour: number; minute: number } => {
  const minute: number = duration % 60;
  const hour: number = Math.round((duration - minute) / 60);
  return {
    hour,
    minute,
  };
};
const convertDurationToString = (duration: number) => {
  const { hour, minute } = getTime(duration);
  const minuteMessage = minute > 0 ? ` ${minute} phút` : "";
  return `${hour} giờ${minuteMessage}`;
};

const convertTimePickerValue = (duration: number): string => {
  const { hour, minute } = getTime(duration);
  const hourPrefix = hour < 10 ? "0" : "";
  const minutePrefix = minute < 10 ? "0" : "";
  // HH:mm
  const result = `${hourPrefix}${hour}:${minutePrefix}${minute}`;
  console.log(
    "🚀 ~ file: common.ts ~ line 21 ~ convertTimePickerValue ~ result",
    result
  );
  return result;
};
export const durationCommon = {
  getTime,
  convertDurationToString,
  convertTimePickerValue,
};
export default {};
