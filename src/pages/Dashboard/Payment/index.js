import { Typography } from '@material-ui/core';
import { useState } from 'react';
import ChooseTicket from '../../../components/Payment';
import FinishPayment from './FinishPayment';

export default function Payment() {
  const [showFinishPayment, setShowFinishPayment] = useState(false);

  return (
    <>
      <Typography variant="h4">Ingresso e pagamento</Typography>

      {!showFinishPayment && <ChooseTicket 
        showFinishPayment={showFinishPayment}
        setShowFinishPayment={setShowFinishPayment}/>}
      {showFinishPayment && <FinishPayment />}
      
    </>
  );
}
