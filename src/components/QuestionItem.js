import React from "react";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question; 

  const onSelect = (event) => {
    const selectedAnswer = event.target.value;
    console.log(selectedAnswer);
    const updateAnswer = {
      correctIndex: selectedAnswer,
    };
    onPatchHandle(id, updateAnswer);
  };

  const onPatchHandle = (id, updateAnswer) => {
    fetch(`http://localhost:3001/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateAnswer)
    })
      .then(resp => { console.log(`correct answer was patched to this index: ${updateAnswer.correctIndex}`) })
      .catch(error => { console.log(error) });
  }

  const onDeleteHandle = (id) => {
    const deletedId = id;
    fetch(`http://localhost:3001/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => { console.log(`question ${deletedId} has been deleted`) })
      .catch(error => { console.log(error) });
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={onSelect}>
          {options}
        </select>
      </label>
      <button onClick={() => onDeleteHandle(id)} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;