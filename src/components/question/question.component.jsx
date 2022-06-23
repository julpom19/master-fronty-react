import './qestion.styles.scss';
import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

const Question = ({ question, answerOnChangeHandler }) => {
  const listOfAnswers = question.answers.map(a => (
      <FormControlLabel key={a.id} control={<Radio />} label={a.content} value={a.id} />
    )
  );

  return (
    <Paper key={question.id} sx={{padding: '20px', margin: '20px 0'}} elevation={3}>
      <Typography variant="h6">{question.content}</Typography>
      <RadioGroup name={question.id} onChange={answerOnChangeHandler} value={question.selectedAnswerId}>
        {listOfAnswers}
      </RadioGroup>
    </Paper>
  );
};

export default Question;