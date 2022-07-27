import { memo } from 'react';
import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { CodeBlock } from 'react-code-blocks';

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
      {/*<CodeBlock*/}
      {/*  text={code}*/}
      {/*  language={'jsx'}*/}
      {/*  showLineNumbers={false}*/}
      {/*/>*/}
    </Paper>
  );
};

export default memo(Question);