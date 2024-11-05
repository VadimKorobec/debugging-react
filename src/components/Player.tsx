import { useRef, useState } from "react";

const Player =() => {
  const playerName = useRef<HTMLInputElement>(null);
  const [enteredPlayerName, setEnteredPlayerName] = useState<null | string>(
    null
  );

  const handleClick = () => {
    const name = playerName.current?.value.trim();
    if (name) {
      setEnteredPlayerName(name);
      playerName.current.value = "";
    }
  };

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName || "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button
          
          onClick={handleClick}
        >
          Set Name
        </button>
      </p>
    </section>
  );
}

export default Player
