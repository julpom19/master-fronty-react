import { memo } from 'react';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const ScoreStars = ({ correctAmount, totalAmount }) => {

  const labels = {
    1: 'Bad',
    2: 'Need to study more',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };

  const labelsCount = Object.keys(labels).length;
  const value = Math.ceil( labelsCount * correctAmount / totalAmount);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>
  );
};

export default memo(ScoreStars);