import axios from "axios";
import { API_TOKEN, API_SUGGESTION_NAME } from "../constants/constants.ts";

type Option = {
  label: string;
  value: string;
};

export const loadOptions = async (inputValue: string) => {
  try {
    const response = await axios.post(
      API_SUGGESTION_NAME,
      { query: inputValue, count: 5 },
      {
        headers: {
          Authorization: `Token ${API_TOKEN}`,
        },
      },
    );

    const responseOptions = response?.data?.suggestions.map(
      (suggestion: Option) => ({
        label: suggestion.value,
        value: suggestion.value,
      }),
    );

    return responseOptions;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default loadOptions;
