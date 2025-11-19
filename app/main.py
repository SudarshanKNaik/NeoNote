"""Minimal FastAPI application instrumented with custom Prometheus metrics.

This file intentionally keeps the business logic very light so you can hook up
the monitoring stack immediately. Replace the placeholder implementations with
your ML-powered features when they are ready.
"""

from __future__ import annotations

import asyncio
from datetime import datetime
from typing import Any, Dict

from fastapi import FastAPI, UploadFile, File

# Importing this module starts the Prometheus metrics HTTP server on port 8001.
import monitoring.instrumentation  # noqa: F401
from monitoring.instrumentation import observe_feature, track_active_job
from monitoring.metrics import FILES_UPLOADED

app = FastAPI(
    title="Student Notes Platform (Demo Backend)",
    version="0.1.0",
    description="Placeholder backend with Prometheus instrumentation.",
)


async def simulate_background_work(feature: str, seconds: float = 1.0) -> None:
    """Simulate asynchronous background processing for demo purposes."""
    with track_active_job(feature):
        await asyncio.sleep(seconds)


@app.get("/health")
async def health_check() -> Dict[str, Any]:
    """Simple health endpoint."""
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.post("/upload")
@observe_feature("file_upload")
async def upload_file(file: UploadFile = File(...)) -> Dict[str, Any]:
    """Pretend to store an uploaded file and increment Prometheus counters."""
    filename = file.filename or "untitled"
    extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else "unknown"
    FILES_UPLOADED.labels(file_type=extension, user_id="anonymous").inc()

    content = await file.read()
    await simulate_background_work("file_upload", seconds=0.5)

    return {
        "filename": filename,
        "size_bytes": len(content),
        "message": "File stored successfully (demo).",
    }


@app.post("/generate-video")
@observe_feature("ppt_to_video")
async def generate_video(payload: Dict[str, Any]) -> Dict[str, Any]:
    await simulate_background_work("ppt_to_video", seconds=1.5)
    return {"status": "ok", "feature": "ppt_to_video", "payload": payload}


@app.post("/generate-quiz")
@observe_feature("quiz")
async def generate_quiz(payload: Dict[str, Any]) -> Dict[str, Any]:
    await simulate_background_work("quiz", seconds=1.0)
    return {"status": "ok", "feature": "quiz", "payload": payload}


@app.post("/generate-mindmap")
@observe_feature("mindmap")
async def generate_mindmap(payload: Dict[str, Any]) -> Dict[str, Any]:
    await simulate_background_work("mindmap", seconds=0.8)
    return {"status": "ok", "feature": "mindmap", "payload": payload}


@app.post("/summarize")
@observe_feature("summary")
async def summarize(payload: Dict[str, Any]) -> Dict[str, Any]:
    await simulate_background_work("summary", seconds=0.6)
    return {"status": "ok", "feature": "summary", "payload": payload}


@app.post("/translate")
@observe_feature("translation")
async def translate(payload: Dict[str, Any]) -> Dict[str, Any]:
    await simulate_background_work("translation", seconds=0.9)
    return {"status": "ok", "feature": "translation", "payload": payload}


@app.post("/video-summary")
@observe_feature("video_summary")
async def video_summary(payload: Dict[str, Any]) -> Dict[str, Any]:
    await simulate_background_work("video_summary", seconds=1.2)
    return {"status": "ok", "feature": "video_summary", "payload": payload}


