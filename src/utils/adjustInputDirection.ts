const persianRegex = /^[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF\u200C]/;

const isPersian = (value: string) => {
  if (value.match(persianRegex)) {
    return true;
  }
  return false;
};
const adjustInputDirectionOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  let value = e.currentTarget.value;
  if (isPersian(e.target.value) || value === "") {
    e.currentTarget.dir = "rtl";
  } else {
    e.currentTarget.dir = "ltr";
  }
};

export default function adjustInputDirection<T extends Function>(fn: T) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    adjustInputDirectionOnChange(e);
    return fn(e);
  };
}
