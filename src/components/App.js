import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then(resp => resp.json())
      .then(questions => setQuestions(questions));
  }, [questions]); // whenever questions in db.json got updated, useEffect will fetch and re-render

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} /> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;