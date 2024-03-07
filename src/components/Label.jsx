import { formatUSCurrency } from "../utils/money";

export const Label = ({ country, amount, year, label }) => {
  return (
    <div className="text- center text-black font-bold text-lg w-96 h-32 p-4 bg-white flex flex-wrap justify-center items-center rounded-md">
      {country} in {year} had {label} as{" "}
      {formatUSCurrency(amount, 2, true, true)}
    </div>
  );
};
