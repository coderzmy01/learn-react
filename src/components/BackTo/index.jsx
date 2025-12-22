import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const BackTo = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} type="back">
      <span>&larr;</span>
      <span>返回</span>
    </Button>
  );
};

export default BackTo;
