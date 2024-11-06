import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

interface ResultModalProps {
  remainingTime: number;
  targetTime: number;
  onReset: () => void;
}

const ResultModal = forwardRef<HTMLDialogElement, ResultModalProps>(
  function ResultModal({ remainingTime, targetTime, onReset }, ref) {
    const dialog = useRef<HTMLDialogElement>(null);

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => ({
      open() {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
    }));

    const portalElement = document.getElementById("modal");

    if (!portalElement) {
      return null;
    }

    return createPortal(
      <dialog ref={dialog} className="result-modal">
        {userLost && <h2>You Lost</h2>}
        {!userLost && <h2>Your Score:{score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with
          <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      portalElement
    );
  }
);

export default ResultModal;
