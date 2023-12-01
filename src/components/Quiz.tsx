import React, { useEffect, useState } from "react";
import { QUESTIONS_ANSWERS } from "../constants/common.constants.ts";

import "./Quiz.css";

function Quiz() {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<any>([]);
  const [answer, setAnswer] = useState<number>();
  const [feedback, setFeedback] = useState<string>("");

  // mount
  useEffect(() => {
    setQuestions(QUESTIONS_ANSWERS);
    setCurrentQIndex(0);
  }, []);

  const checkAnswer = async (question, answer, date) => {
    const payload_json = {
      message_data: {
        author_id: "27833335555",
        author_type: "OWNER",
        contact_uuid: "e331dc93-1b9a-4db4-ad58-315d1c95f243",
        message_direction: "inbound",
        message_id: "ABGGJ4MzZWFfAgs-sCaxu0X72jwgbg",
        message_body: answer,
        question: question.question,
        expected_answer: question.expected_answer,
        message_inserted_at: "",
        message_updated_at: "",
      },
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload_json }),
    };
    return fetch(
      "https://rori-answers-api-iadgvfgdkq-ew.a.run.app/v2/nlu",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data, "answer data"))
      .catch((e) => console.log(e, "error in fetching"));
  };

  const checkAnswerManually = (question, answer, date) => {
    if (answer !== Number(question.expected_answer)) {
      setFeedback("Wrong Answer");
    } else {
      setFeedback("Correct Answer");
    }
  };

  const submitAnswer = async (e) => {
    if (answer !== undefined) {
      const res = await checkAnswer(
        questions[currentQIndex],
        answer,
        new Date().toISOString()
      );

      checkAnswerManually(
        questions[currentQIndex],
        answer,
        new Date().toISOString()
      );

      // change question in 3 seconds
      setTimeout(() => {
        setAnswer(0);
        setCurrentQIndex(currentQIndex + 1);
        setFeedback('');
      }, 3000)
    }
  };

  return (
    <div className="quiz-container">
      <div className="question">{questions[currentQIndex]?.question}</div>
      <input
        className="answer"
        type="number"
        placeholder="Enter your answer"
        value={answer}
        onChange={(e) => setAnswer(Number(e.target.value))}
      />
      <button className="submit-btn" type="submit" onClick={submitAnswer}>
        Submit
      </button>
      {feedback ? <>
        <div className="feedback">{feedback}</div> </> : <></>}
    </div>
  );
}

export default Quiz;
