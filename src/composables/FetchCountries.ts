import { ref, computed } from "vue";

export const useFetchCountries = () => {
  // Request States
  const REQUEST_IN_PROGRESS = "REQUEST_IN_PROGRESS";
  const REQUEST_ERROR = "REQUEST_ERROR";
  const REQUEST_SUCCESS = "REQUEST_SUCCESS";
  const requestState = ref("");
  const loading = computed(() => requestState.value === REQUEST_IN_PROGRESS);
  const error = computed(() => requestState.value === REQUEST_ERROR);

  // Countries
  const countries = ref();

  const fetchCountries = async (url: string): Promise<void> => {
    countries.value = null;
    requestState.value = REQUEST_IN_PROGRESS;
    try {
      const res = await fetch(url);
      countries.value = await res.json();
      requestState.value = REQUEST_SUCCESS;
    } catch (error) {
      requestState.value = REQUEST_ERROR;
    }
  };
  return { countries, loading, error, fetchCountries };
};
