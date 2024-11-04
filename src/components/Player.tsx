import { useState } from "react";

export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value.trim();
    setEnteredPlayerName(enteredName);
  };

  const handleClick = () => {
    console.log(enteredPlayerName);
    setSubmitted(true);
  };

  return (
    <section id="player">
      <h2>Welcome {submitted ? enteredPlayerName : "unknown entity"}</h2>
      <p>
        <input type="text" value={enteredPlayerName} onChange={handleChange} />
        <button disabled={!enteredPlayerName} onClick={handleClick}>
          Set Name
        </button>
      </p>
    </section>
  );
}
