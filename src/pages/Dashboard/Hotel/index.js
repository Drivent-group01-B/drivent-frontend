import { Typography } from '@material-ui/core';
import { useState } from 'react';
import Hotel from '../../../components/Hotel';

export default function ChooseAccommodation() {
  const [showBooking, setShowBooking] = useState(false);
  return (
    <>
      <Typography variant="h4">Escolha de Quarto e Hotel</Typography>

      {!showBooking && <Hotel showBooking={showBooking} setShowFinishPayment={setShowBooking} />}
      {showBooking && <>ComponenteFinalização</>}
    </>
  );
}
