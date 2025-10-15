
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import {
  Work as WorkIcon,
  School as SchoolIcon,
  EmojiEvents as AwardIcon,
  ChevronRight,
  Science
} from "@mui/icons-material";
import { motion } from "framer-motion";

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  category: "work" | "education" | "achievement"| "reseacrh";
  icon: "briefcase" | "graduation" | "award" | 'science';
}

const MileStone = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Editable milestones data - you can modify this array
  const [milestones] = useState<Milestone[]>([
    {
      id: 1,
      year: "DEC 2024 - Present",
      title: "Full-Stack Developer",
      description: "Developing web applications with React, Node.js, and AI integration",
      category: "work",
      icon: "briefcase",
    },
    {
      id: 3,
      year: "Jan 2025 - Present",
      title: "Honour Research Project",
      description: "Joined sponsored Honours project aimed at exploring the capabilities of the UNSW MCK model in verifying zero-knowledge-related protocols.",
      category: "reseacrh",
      icon: "science",
    },
    {
      id: 3,
      year: "FEB 2022 - DEC 2025",
      title: "Computer Science Degree at UNSW",
      description: "Completed Bachelor's degree with Distinction 82.9 WAM focus on software engineering and AI",
      category: "education",
      icon: "graduation",
    },

    {
      id: 2,
      year: "2023",
      title: "AI Research Project",
      description: "Contributed to an AI research project applying machine learning techniques to cardiology diagnosis.",
      category: "achievement",
      icon: "award",
    },

    {
      id: 4,
      year: "2022",
      title: "First Web Application",
      description: "Built and deployed first full-stack portfolio using MERN frameworks",
      category: "achievement",
      icon: "award",
    },
  ]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "briefcase":
        return <WorkIcon />;
      case "graduation":
        return <SchoolIcon />;
      case "award":
        return <AwardIcon />;
      case 'science':
        return <Science/>
      default:
        return <WorkIcon />;
    }
  };

  const getCategoryColor = (category: string): "primary" | "secondary" | "success" => {
    switch (category) {
      case "work":
        return "primary";
      case "education":
        return "secondary";
      case "achievement":
        return "success";
      default:
        return "primary";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 10,
        px: { xs: 2, md: 4, lg: 8 },
        background: "linear-gradient(180deg, rgba(59,130,246,0.05) 0%, rgba(168,85,247,0.05) 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: "linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              My Journey
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Key milestones and achievements in my development career
            </Typography>
          </Box>
        </motion.div>

        {/* Timeline */}
        <Timeline position={isMobile ? "right" : "alternate"}>
          {milestones.map((milestone, index) => (
            <TimelineItem key={milestone.id}>
              {!isMobile && (
                <TimelineOppositeContent
                  sx={{ py: 3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {milestone.year}
                    </Typography>
                  </motion.div>
                </TimelineOppositeContent>
              )}

              <TimelineSeparator>
                <TimelineConnector
                  sx={{
                    background: "linear-gradient(180deg, #3b82f6 0%, #a855f7 100%)",
                  }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TimelineDot
                    color={getCategoryColor(milestone.category)}
                    sx={{
                      boxShadow: "0 0 20px rgba(59,130,246,0.5)",
                      p: 1.5,
                    }}
                  >
                    {getIcon(milestone.icon)}
                  </TimelineDot>
                </motion.div>
                <TimelineConnector
                  sx={{
                    background: "linear-gradient(180deg, #a855f7 0%, rgba(59,130,246,0.3) 100%)",
                  }}
                />
              </TimelineSeparator>

              <TimelineContent sx={{ py: 3, px: 2 }}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 0 30px rgba(59,130,246,0.3)",
                        borderColor: "primary.main",
                      },
                      border: "1px solid",
                      borderColor: "divider",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <CardContent>
                      {isMobile && (
                        <Typography
                          variant="subtitle2"
                          color="primary"
                          fontWeight="bold"
                          sx={{ mb: 1 }}
                        >
                          {milestone.year}
                        </Typography>
                      )}

                      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
                        <Chip
                          label={milestone.category}
                          color={getCategoryColor(milestone.category)}
                          size="small"
                          icon={getIcon(milestone.icon)}
                        />
                      </Box>

                      <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                        {milestone.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" paragraph>
                        {milestone.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "primary.main",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          opacity: 0,
                          transition: "opacity 0.3s",
                          ".MuiCard-root:hover &": {
                            opacity: 1,
                          },
                        }}
                      >
                        <ChevronRight fontSize="small" />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        {/* Edit Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
        </motion.div>
      </Container>
    </Box>
  );
};

export default MileStone;
