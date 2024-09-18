import React from 'react'
import { Project } from '../models/Project'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ImageKit from './ImageKit';
import { motion } from 'framer-motion';


interface ProjectCardProps {
  project : Project;
  //className={styles.priceNote}
  onDeleteNoteClicked: (project : Project) => void,
  onEditNoteClicked: (project : Project) => void
  onNoteClicked: (project : Project) => void
}

const ProjectCard = (props : ProjectCardProps) => {
  const {title, text, image, demoUrl} = props.project;
  const imagekit = () => ImageKit({path: image});
  return (
    <>  <motion.div whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 500, duration: 0.5 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
    >
       <Card >
          <CardMedia
            component={imagekit}
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={() => props.onEditNoteClicked(props.project)}>
          EDIT
        </Button>
      </CardActions>
      </Card>
      </motion.div>
    </>
  )
}

export default ProjectCard;


