"""
Prometheus instrumentation for the student notes platform.

This module automatically starts the Prometheus metrics HTTP server on port 8001
when imported. It also provides decorators and utilities for instrumenting
application code with metrics.

Usage:
    # In app/main.py, simply import this module:
    import monitoring.instrumentation
    
    # Then use the decorator on your routes:
    from monitoring.instrumentation import observe_feature
    
    @app.post("/generate-video")
    @observe_feature("ppt_to_video")
    async def generate_video(...):
        ...
"""

import asyncio
import functools
import time
from contextlib import contextmanager
from typing import Callable, Any

from prometheus_client import start_http_server

from monitoring.metrics import (
    FEATURE_REQUESTED,
    FEATURE_DURATION_SECONDS,
    ACTIVE_JOBS
)

# Start Prometheus metrics server on port 8001
# This will be called automatically when the module is imported
try:
    start_http_server(8001)
    print("✓ Prometheus metrics server started on port 8001")
except OSError as e:
    # Port might already be in use (e.g., during development reloads)
    print(f"⚠ Prometheus metrics server port 8001 already in use: {e}")


def observe_feature(feature_name: str):
    """
    Decorator to automatically track feature usage and execution duration.
    
    This decorator works with both synchronous and asynchronous functions.
    It increments the FEATURE_REQUESTED counter and records execution time
    in the FEATURE_DURATION_SECONDS histogram.
    
    Args:
        feature_name: Name of the feature (e.g., "ppt_to_video", "mindmap", "quiz")
    
    Returns:
        Decorated function that tracks metrics automatically
    
    Example:
        @app.post("/generate-video")
        @observe_feature("ppt_to_video")
        async def generate_video(request: VideoRequest):
            # Your code here
            return {"status": "success"}
    """
    def decorator(func: Callable) -> Callable:
        if asyncio.iscoroutinefunction(func):
            # Handle async functions
            @functools.wraps(func)
            async def async_wrapper(*args, **kwargs):
                # Increment feature request counter
                FEATURE_REQUESTED.labels(feature=feature_name).inc()
                
                # Measure execution time
                start_time = time.perf_counter()
                try:
                    result = await func(*args, **kwargs)
                    return result
                finally:
                    duration = time.perf_counter() - start_time
                    FEATURE_DURATION_SECONDS.labels(feature=feature_name).observe(duration)
        else:
            # Handle sync functions
            @functools.wraps(func)
            def sync_wrapper(*args, **kwargs):
                # Increment feature request counter
                FEATURE_REQUESTED.labels(feature=feature_name).inc()
                
                # Measure execution time
                start_time = time.perf_counter()
                try:
                    result = func(*args, **kwargs)
                    return result
                finally:
                    duration = time.perf_counter() - start_time
                    FEATURE_DURATION_SECONDS.labels(feature=feature_name).observe(duration)
        
        # Return the appropriate wrapper
        return async_wrapper if asyncio.iscoroutinefunction(func) else sync_wrapper
    
    return decorator


@contextmanager
def track_active_job(job_type: str):
    """
    Context manager to track active background jobs.
    
    Increments ACTIVE_JOBS when entering the context and decrements when exiting.
    Useful for tracking long-running background tasks.
    
    Args:
        job_type: Type of job (e.g., "video_generation", "file_processing")
    
    Example:
        with track_active_job("video_generation"):
            # Your background job code here
            process_video(file_path)
    """
    ACTIVE_JOBS.labels(job_type=job_type).inc()
    try:
        yield
    finally:
        ACTIVE_JOBS.labels(job_type=job_type).dec()


# Example usage in routes:
"""
# Example 1: Async route with feature tracking
from fastapi import FastAPI
from monitoring.instrumentation import observe_feature

app = FastAPI()

@app.post("/generate-video")
@observe_feature("ppt_to_video")
async def generate_video(request: VideoRequest):
    # Your video generation logic here
    return {"status": "success", "video_id": "123"}

# Example 2: Sync route with feature tracking
@app.post("/generate-mindmap")
@observe_feature("mindmap")
def generate_mindmap(request: MindmapRequest):
    # Your mindmap generation logic here
    return {"status": "success", "mindmap_id": "456"}

# Example 3: Background job tracking
from monitoring.instrumentation import track_active_job

async def process_file_background(file_id: str):
    with track_active_job("file_processing"):
        # Long-running file processing
        await process_file(file_id)
"""

