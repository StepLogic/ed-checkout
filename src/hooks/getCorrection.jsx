import React from "react";
import useAuth from "@hooks/useMyContext";
const getCorrection = (id) => {
  const { exercises } = useAuth();
  const [exercise, setExercise] = React.useState();

  function getIeltsScore(score) {
    let ielts = {
      "39-40": 9,
      "37-38": 8.5,
      "35-36": 8,
      "32-34": 7.5,
      "30-31": 7,
      "26-29": 6.5,
      "23-25": 6,
      "18-22": 5.5,
      "16-17": 5,
      "13-15": 4.5,
      "11-12": 4,
      "0-10": 0,
    };

    for (let [range, value] of Object.entries(ielts)) {
      let rangeValues = range.split("-");
      if (score >= rangeValues[0] && score <= rangeValues[1]) {
        return value;
      }
    }
  }

  React.useEffect(() => {
    if (id === undefined || id === null || !exercises) return;

    const ex = exercises.done.find((exercise) => exercise.token_ex === id);

    delete ex.user_submit.date_completion;

    if (ex.type != "Writing" && ex) {
      const copy = { ...ex.questions, ...ex.user_submit };

      ex.result = copy;

      // if(ex.user_score == null && ex.type == )

      let score = String(ex.user_score);
      score = score.split("/")[0];

      score = Number(score);

      ex.ielts_score = getIeltsScore(score);
    }

    setExercise(ex);
  }, [id]);

  return { exercise };
};

export default getCorrection;
