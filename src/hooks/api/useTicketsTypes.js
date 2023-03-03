import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicketsTypes() {
  const token = useToken();
  
  const {
    data: ticketsTypes,
    loading: ticketsTypesLoading,
    error: ticketsTypesError,
    act: getTicketsTypes
  } = useAsync(() => ticketApi.getTicketsTypes(token));

  return {
    ticketsTypes,
    ticketsTypesLoading,
    ticketsTypesError,
    getTicketsTypes
  };
}
