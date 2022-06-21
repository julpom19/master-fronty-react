import './question-answered.styles.scss';

const QuestionAnswered = ({ questionAnswered }) => {
  questionAnswered.answers.forEach(a => {
    let className = '';
    if(a.isCorrect) {
      className = 'correct';
    }
    if(a.isSelectedByUser) {
      if(a.isCorrect) {
        className += ' correctly-answered';
      } else {
        className += ' wrongly-answered';
      }
    }
    a.className = className;
  });

  const listOfAnswers = questionAnswered.answers.map(a => (
      <li key={a.id} className='answer'>
        <div className={a.className}>{a.content}</div>
      </li>
    )
  );

  return (
    <li key={questionAnswered.id}>
      <div>{questionAnswered.content}</div>
      <ol>
        {listOfAnswers}
      </ol>
    </li>
  );
}
export default QuestionAnswered;