export const GDP = "GDP";
export const GDP_PER_CAPITA = "GDP_PER_CAPITA";
export const NORMALIZED_GDP = "NORMALIZED_GDP";
export const NORMALIZED_GDP_PER_CAPITA = "NORMALIZED_GDP_PER_CAPITA";

export const GDP_NAME = "GDP";
export const GDP_PER_CAPITA_NAME = "GDP PER CAPITA";

export const LOW_YEAR = 1960;
export const HIGH_YEAR = 2021;

export const NUMBER_OF_YEARS = HIGH_YEAR - LOW_YEAR;
export const DISPLAY_DATA = {
  [GDP]: { altitude: NORMALIZED_GDP, label: GDP, name: GDP_NAME },
  [GDP_PER_CAPITA]: {
    altitude: NORMALIZED_GDP_PER_CAPITA,
    label: GDP_PER_CAPITA,
    name: GDP_PER_CAPITA_NAME,
  },
};
