type ResetterFunctionType = () => void;

const ResetterButtons = ({handleSpeedometerResetterClick, handleOutCharsResetterClick}: {handleSpeedometerResetterClick: ResetterFunctionType, 
handleOutCharsResetterClick: ResetterFunctionType}) => {
  return (
    <p>
      <span className="speedometer-resetter" onClick={() => {
        handleSpeedometerResetterClick();
        }}>Reset speed counters
      </span>
      <span className="outChars-resetter" onClick={() => {
        handleOutCharsResetterClick();
        }}>Clear typed characters and reset accuracy
      </span>
    </p>
  );
}

export default ResetterButtons;