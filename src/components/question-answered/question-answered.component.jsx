import './question-answered.styles.scss';
import { Chip, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Fragment } from 'react';

const QuestionAnswered = ({ questionAnswered, questionIndex }) => {
  questionAnswered.answers.forEach(a => {
    let className = '';
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
      <Fragment key={a.id}>
        <Divider />
        <ListItem sx={{display: 'flex', justifyContent: 'spaceBetween'}} className={a.className}>
          <ListItemText>{a.content}</ListItemText>
          {a.isCorrect && <Chip label="Correct answer" />}
        </ListItem>
      </Fragment>
    )
  );

  return (
    <Paper key={questionAnswered.id} sx={{padding: '20px', margin: '20px 0'}} elevation={3}>
      <Typography variant="h6">{questionIndex + 1}. {questionAnswered.content}</Typography>
      <List>
        {listOfAnswers}
        <Divider />
      </List>
    </Paper>
  );
}
export default QuestionAnswered;