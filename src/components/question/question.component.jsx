import './qestion.styles.scss';

const Question = ({ question, answerOnChangeHandler }) => {

  const listOfAnswers = question.answers.map(a => (
      <li key={a.id}>
        <input type="radio" value={a.id} name={question.id} onChange={answerOnChangeHandler}/>
        {a.content}
      </li>
    )
  );

  return (
    <li key={question.id}>
      <div>{question.content}</div>
      <ol>
        {listOfAnswers}
      </ol>
    </li>
  );
};

export default Question;