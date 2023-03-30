import React from "react";

export default function useSteps(initialStep) {
  const [step, setStep] = React.useState(initialStep ?? 0);
  const previousValue = React.useRef(null);

  React.useEffect(() => {
    previousValue.current = step;
  }, [step]);

  const goTo = (value) => setStep(value);
  const goBack = () => setStep(previousValue.current);
  return { step, goTo, goBack };
}
