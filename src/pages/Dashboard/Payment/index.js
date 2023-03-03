import FinishPayment from './FinishPayment';

export default function Payment() {
<<<<<<< Updated upstream
  return <FinishPayment />;
=======
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
>>>>>>> Stashed changes
}
