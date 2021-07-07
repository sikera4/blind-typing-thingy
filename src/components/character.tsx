interface CharacterInterface {
  leftPadding: string;
  outgoingChars: string;
  wrongChar: boolean;
  currentChar: string;
  incomingChars: string;
}

const Character = (props: CharacterInterface) => {
  return (
    <p className="Character">
      <span className="Character-out">
        {(props.leftPadding + props.outgoingChars).slice(-20)}
      </span>
      <span className={props.wrongChar ? "Character-current-wrong" : "Character-current"}>{props.currentChar}</span>
      <span>{props.incomingChars.substr(0, 20)}</span>
    </p>
  )
}

export default Character;