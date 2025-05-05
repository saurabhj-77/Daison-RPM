import {
    Box,
    Typography,
    Card,
    CardContent,
    Fab,
    Chip,
    Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";

// Sample dummy data
const dummyMeasurements = {
    "heart-rate": [
        {
            value: 588,
            unit: "bpm",
            timestamp: "2025-04-30T14:44:00",
            status: "Critical",
        },
        {
            value: 120,
            unit: "bpm",
            timestamp: "2025-04-30T14:43:00",
            status: "Warning",
        },
    ],
    "body-temperature": [],
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "Critical":
            return "error";
        case "Warning":
            return "warning";
        default:
            return "success";
    }
};

export default function MeasurementHistory() {
    const { patientId, measurementType } = useParams();
    // const navigate = useNavigate();
    const [measurements, setMeasurements] = useState<any[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const currentMeasurementType = location.state?.measurementType || "Heart Rate";

    useEffect(() => {
        // Replace this with Firebase call later
        const data = dummyMeasurements[measurementType as keyof typeof dummyMeasurements] || [];
        setMeasurements(data);
    }, [measurementType]);

    const title = measurementType?.replace("-", " ") || "";

    return (
        <MainLayout>
            <Box p={2}>
                <Box display="flex" alignItems="center" mb={2}>
                    <ArrowBackIcon onClick={() => navigate(-1)} sx={{ cursor: "pointer", mr: 1 }} />
                    <Typography variant="h5" fontWeight="bold">
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                    </Typography>
                </Box>

                <Typography color="text.secondary" mb={2} variant="h4">
                    Measurement History
                </Typography>

                {measurements.length > 0 ? (
                    measurements.map((item, idx) => {
                        const date = new Date(item.timestamp);
                        return (
                            <Card key={idx} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {date.toLocaleDateString()} &nbsp;&nbsp; {date.toLocaleTimeString()}
                                    </Typography>
                                    <Typography mt={1} variant="h6" fontWeight="bold">
                                        Reading: {item.value} {item.unit}
                                    </Typography>
                                    {item.status && (
                                        <Chip
                                            label={item.status}
                                            color={getStatusColor(item.status)}
                                            variant="outlined"
                                            sx={{ fontSize: '1rem', height: 36, px: 2 }}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <Typography>No readings found.</Typography>
                )}

                <Box
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: 1000, // ensure it floats above other UI
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate("/add-measurement", {
                                state: { measurementType },
                            });
                        }}
                    >
                        Add Measurement
                    </Button>
                </Box>
            </Box>
        </MainLayout>
    );
}
