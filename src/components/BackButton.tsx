import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate(-1)} color="primary" aria-label="back button">
      <ArrowBackIcon style={{ width: 35, height: 35 }} />
    </IconButton>
  );
}

export default BackButton;