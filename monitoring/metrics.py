"""
Prometheus metrics for the student notes platform.
Uses prometheus-client library to export business metrics.
"""

from prometheus_client import Counter, Histogram, Gauge

# Counter: Files uploaded by type and user
FILES_UPLOADED = Counter(
    'files_uploaded_total',
    'Total number of files uploaded',
    ['file_type', 'user_id']
)

# Counter: Feature requests by feature type
FEATURE_REQUESTED = Counter(
    'feature_requested_total',
    'Total number of feature requests',
    ['feature']
)

# Histogram: Feature execution duration
FEATURE_DURATION_SECONDS = Histogram(
    'feature_duration_seconds',
    'Duration of feature execution in seconds',
    ['feature'],
    buckets=[5, 10, 30, 60, 120, 300, 600, 1800, 3600]  # 5s to 1 hour
)

# Gauge: Active background jobs
ACTIVE_JOBS = Gauge(
    'active_jobs',
    'Number of currently active background jobs',
    ['job_type']
)

