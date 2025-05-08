import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";

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

export default function DoctorMeasurementHistory() {
    const { patientId, measurementType } = useParams();
    console.log("Measurement Type:", measurementType);
    const navigate = useNavigate();
    const location = useLocation();
    const currentMeasurementType =
        location.state?.measurementType || measurementType || "";

    const [measurements, setMeasurements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    console.log("Patient ID:", patientId);

    const fetchMeasurements = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch(
                `http://localhost:2000/api/v1/doctor/patient-data/${measurementType}/${patientId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to fetch measurements");
            const result = await response.json();
            setMeasurements(result.data || []);
        } catch (error) {
            console.error("Error fetching measurements:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeasurements();
    }, [patientId, measurementType]);

    const title = measurementType?.replace("-", " ") || "";

    const formatBloodPressureValue = (value: string) => {
        try {
            // Try parsing as JSON first
            const parsed = JSON.parse(value);
            if (parsed.systolic && parsed.diastolic) {
                return `${parsed.systolic.replace(" mmHg", "")}/${parsed.diastolic.replace(" mmHg", "")}`;
            }
        } catch (err) {
            // If not JSON, handle manually
            const systolicMatch = value.match(/Systolic:\s*(\d+)\s*mmHg/i);
            const diastolicMatch = value.match(/Diastolic:\s*(\d+)\s*mmHg/i);
            if (systolicMatch && diastolicMatch) {
                return `${systolicMatch[1]}/${diastolicMatch[1]}`;
            }

            // Fallback: assume already in proper format like "120/80"
            if (value.includes("/")) return value;
        }

        return "N/A";
    };


    return (
        <MainLayout>
            <Box p={2}>
                <Box display="flex" alignItems="center" mb={2}>
                    <ArrowBackIcon
                        onClick={() => navigate(-1)}
                        sx={{ cursor: "pointer", mr: 1 }}
                    />
                    <Typography variant="h5" fontWeight="bold">
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                    </Typography>
                </Box>

                <Typography color="text.secondary" mb={2} variant="h4">
                    Measurement History
                </Typography>

                {loading ? (
                    <Typography>Loading...</Typography>
                ) : measurements.length > 0 ? (
                    measurements.map((item, idx) => {
                        const date = new Date(item.timestamp);
                        return (
                            <Card key={idx} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(item.readingTime).toLocaleDateString()} &nbsp;&nbsp;
                                        {new Date(item.readingTime).toLocaleTimeString()}
                                    </Typography>

                                    <Typography mt={1} variant="h6" fontWeight="bold">
                                        Reading: {item.value} {item.unit}
                                    </Typography>

                                    {item.status && (
                                        <Chip
                                            label={item.status}
                                            color={getStatusColor(item.status)}
                                            variant="outlined"
                                            sx={{ fontSize: "1rem", height: 36, px: 2 }}
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
                        zIndex: 1000,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate("/doctor-add-measurement", {
                                state: { measurementType, patientId },
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
