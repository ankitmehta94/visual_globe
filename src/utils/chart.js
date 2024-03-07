export function convertData(data, valueType) {
  // Initialize an empty array for the formatted data
  const formattedData = [];

  // Function to create a date string for the first of January of the given year
  function createDateForYear(year) {
    const date = new Date(year, 0, 1); // Months are 0-indexed in JavaScript, so 0 represents January
    return date.toISOString(); // Convert to ISO string format
  }

  // Iterate over each year in the data
  Object.keys(data).forEach((year) => {
    // Skip the "Country Name" key
    if (year !== "Country Name") {
      // Create a new object with the desired structure
      const newDataPoint = {
        date: createDateForYear(year), // Dynamically set the date to the first of January of the current year
        close: data[year][valueType], // Set the close value based on the passed parameter (GDP or GDP_PER_CAPITA)
      };
      formattedData.push(newDataPoint);
    }
  });

  return formattedData;
}
