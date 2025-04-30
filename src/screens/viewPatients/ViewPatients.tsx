import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Paper,
  Avatar,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
// import BottomNavigation from './BottomNavigation'; // You'll need to create this component

// Dummy data
const dummyPatient = {
  id: 'patient123',
  docId: 'patient123',
  firstName: 'John',
  lastName: 'Doe'
};

const measurementTypes = [
  'Blood Pressure',
  'Heart Rate',
  'Oxygen Level',
  'Temperature',
  'Weight'
];

const dummyMeasurements = [
  {
    type: 'Blood Pressure',
    lastReading: 'Last Reading - 2 hours ago',
    reading: { systolic: '120', diastolic: '80' },
    unit: 'mmHg'
  },
  {
    type: 'Heart Rate',
    lastReading: 'Last Reading - 1 day ago',
    reading: '72',
    unit: 'bpm'
  },
  {
    type: 'Oxygen Level',
    lastReading: 'Last Reading - 3 days ago',
    reading: '98',
    unit: '%'
  },
  {
    type: 'Temperature',
    lastReading: 'Last Reading - 1 week ago',
    reading: '98.6',
    unit: '°F'
  },
  {
    type: 'Weight',
    lastReading: 'Last Reading - 2 weeks ago',
    reading: '175',
    unit: 'lbs'
  }
];

const dummyAssessments = [
  {
    id: 'assessment1',
    datetime: new Date(Date.now() - 86400000), // Yesterday
    type: 'status',
    status: 'status_normal',
    patientId: 'patient123'
  },
  {
    id: 'assessment2',
    datetime: new Date(Date.now() - 259200000), // 3 days ago
    type: 'predicted',
    status: 'status_warning',
    patientId: 'patient123'
  }
];

// Status color mapping
const statusColors = {
  status_normal: '#4CAF50', // green
  status_warning: '#FFC107', // amber
  status_high: '#FF9800', // orange
  status_critical: '#F44336' // red
};

// Localization mock
const translations = {
  'patient_name': 'Patient Name',
  'remove': 'Remove',
  'measurements': 'Measurements',
  'loading_measurements': 'Loading measurements...',
  'assessments': 'Assessments',
  'no_assessments_found': 'No assessments found',
  'report_type': 'Report Type',
  'status_assessment': 'Status Assessment',
  'predicted_status': 'Predicted Status',
  'status_normal': 'Normal',
  'status_warning': 'Warning',
  'status_high': 'High',
  'status_critical': 'Critical'
};

const local = {
  t: (key: keyof typeof translations) => translations[key] || key
};

const ViewPatientDetails = () => {
  const [patient] = useState(dummyPatient);
  const [measurementList, setMeasurementList] = useState<
    { type: string; lastReading: string; reading: { systolic: string; diastolic: string; } | string; unit: string; }[]
  >([]);
  const [assessments, setAssessments] = useState<
    { id: string; datetime: Date; type: string; status: string; patientId: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMeasurementList(dummyMeasurements);
      setAssessments(dummyAssessments);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRemovePatient = () => {
    // Simulate removing patient
    console.log('Removing patient:', patient.id);
    // In a real app, you would call an API here
    navigate(-1); // Go back
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || '#000000';
  };

  const formatDate = (date: Date) => {
    const options = { year: 'numeric' as const, month: 'short' as const, day: 'numeric' as const };
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date.toLocaleDateString(undefined, options)} at ${time}`;
  };

  const handleMeasurementClick = (type: string) => {
    navigate(`/measurement-history/${type}/${patient.id}`);
  };

  const handleAssessmentClick = (assessment: { id: string; datetime: Date; type: string; status: string; patientId: string }) => {
    navigate(`/view-assessment/${assessment.id}/${patient.id}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Paper
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          padding: 2,
          borderRadius: 0
        }}
        elevation={0}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                {local.t('patient_name')}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {`${patient.firstName} ${patient.lastName}`}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: theme.palette.text.primary,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }
              }}
              onClick={handleRemovePatient}
            >
              {local.t('remove')}
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Content */}
      <Box sx={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg" sx={{ paddingBottom: 10 }}>
          <Paper
            sx={{
              borderRadius: '16px 16px 0 0',
              marginTop: '-16px',
              padding: 3
            }}
            elevation={0}
          >
            {/* Measurements Section */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {local.t('measurements')}
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : measurementList.length === 0 ? (
              <Typography variant="body1" color="textSecondary">
                {local.t('loading_measurements')}
              </Typography>
            ) : (
              <List sx={{ mb: 4 }}>
                {measurementList.map((item, index) => (
                  <Paper
                    key={index}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: theme.shadows[1]
                    }}
                  >
                    <ListItem
                      component="button"
                      onClick={() => handleMeasurementClick(item.type)}
                      sx={{
                        padding: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}
                        >
                          {item.type}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item.lastReading}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
                        >
                          {item.reading
                            ? item.type === 'Blood Pressure'
                              ? typeof item.reading === 'object' && 'systolic' in item.reading && 'diastolic' in item.reading
                                ? `${item.reading.systolic}/${item.reading.diastolic} (${item.unit})`
                                : 'N/A'
                              : `${item.reading} (${item.unit})`
                            : 'N/A'}
                        </Typography>
                      </Box>
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <ChevronRightIcon sx={{ color: theme.palette.primary.dark }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Paper>
                ))}
              </List>
            )}

            {/* Assessments Section */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {local.t('assessments')}
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : assessments.length === 0 ? (
              <Typography variant="body1" color="textSecondary">
                {local.t('no_assessments_found')}
              </Typography>
            ) : (
              <List>
                {assessments.map((assessment, index) => (
                  <Paper
                    key={index}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: theme.shadows[1]
                    }}
                  >
                    <ListItem
                      component="button"
                      onClick={() => handleAssessmentClick(assessment)}
                      sx={{
                        padding: 2,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 1
                        }}
                      >
                        <Typography variant="body1" color="textSecondary">
                          {formatDate(assessment.datetime)}
                        </Typography>
                        <ChevronRightIcon sx={{ color: theme.palette.primary.dark }} />
                      </Box>

                      <Divider sx={{ width: '100%', my: 1 }} />

                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {local.t('report_type')}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.primary.dark, fontWeight: 'bold' }}
                          >
                            {assessment.type === 'status'
                              ? local.t('status_assessment')
                              : local.t('predicted_status')}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            border: `1px solid ${getStatusColor(assessment.status)}`,
                            borderRadius: '20px',
                            backgroundColor: `${getStatusColor(assessment.status)}20`,
                            padding: '4px 12px'
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: getStatusColor(assessment.status),
                              fontWeight: 'bold'
                            }}
                          >
                            {local.t(assessment.status as keyof typeof translations)}
                            {local.t(assessment.status as keyof typeof translations || 'status_normal')}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  </Paper>
                ))}
              </List>
            )}
          </Paper>
        </Container>
      </Box>

      {/* Bottom Navigation */}
      {/* <BottomNavigation currentPage={5} /> */}
    </Box>
  );
};

export default ViewPatientDetails;