import  { useRef, useState } from 'react';
import { Project } from '../models/Project';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, IconButton, CircularProgress, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Edit, Info, PlayArrow } from '@mui/icons-material';
import { useAppContext } from '../context/Context';

interface ProjectCardProps {
  project: Project;
  onDeleteNoteClicked: (project: Project) => void;
  onEditNoteClicked: (project: Project) => void;
  onNoteClicked: (project: Project) => void;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { title, text, images, demoUrl, video } = props.project;
  const theme = useTheme();
  const { isLoggedIn } = useAppContext();

  // State for cycling through images and managing loading
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const cycleInterval = useRef<NodeJS.Timeout | null>(null);

  // Start cycling through images when hovered
  const startImageCycle = () => {
    
    if (images.length > 1 && !cycleInterval.current) {
      setLoading(true);
      let index = 0;
      cycleInterval.current = setInterval(() => {
        setLoading(false);
        index = (index + 1) % images.length; // Cycle through images
        setCurrentImageIndex(index);
        
      }, 1200); // Change image every second
    }
  };

  const stopImageCycle = () => {
    if (cycleInterval.current) {
      clearInterval(cycleInterval.current);
      cycleInterval.current = null;
    }
    setCurrentImageIndex(0); // Reset to the first image
    setLoading(false); // Stop showing spinner
  };

  // Handle image load completion
  const handleImageLoad = () => {
    setLoading(false); // Stop showing spinner once image is loaded
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 500, duration: 0.5 }}
    >
      <Card
        elevation={3}
        sx={{
          margin: 1,
          backgroundColor: theme.palette.background.paper,
          padding: 2,
          borderRadius: 1,
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
          transition: 'transform 0.3s ease-in-out',
          width: 'auto',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
        onMouseOver={startImageCycle}
        onMouseOut={stopImageCycle}
      >
        <CardMedia
          component="div"
          sx={{
            height: 200,
            width: '100%',
            position: 'relative',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />
          )}
          <AnimatePresence>
            <motion.img
              key={currentImageIndex}
              src={
                images
                  ? images[currentImageIndex]
                  : 'https://ik.imagekit.io/8rwehsppf/KZIO/cartoon.webp?updatedAt=1732895607730'
              }
              alt={`Image ${currentImageIndex + 1}`}
              onLoad={handleImageLoad} // Image load complete
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                position: 'absolute',
              }}
            />
          </AnimatePresence>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {text}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexWrap: 'wrap', 
            
            gap: 0.6, 
          }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => props.onEditNoteClicked(props.project)}
            disabled={!isLoggedIn}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => props.onDeleteNoteClicked(props.project)}
            disabled={!isLoggedIn}
          >
            <Delete />
          </IconButton>
          {demoUrl && (
            <Button
              
              variant="contained"
              startIcon={<Info />}
              href={demoUrl}
            >
              Details
            </Button>
          )}
          {video && (
            <Button
              
              variant="contained"
              startIcon={<PlayArrow />}
              href={video}
            >
              Video
            </Button>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
