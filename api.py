"""pywebview API exposed to the Disk Analyzer frontend."""

from __future__ import annotations

import json
import os
import sys
import tkinter as tk
from tkinter import filedialog
from datetime import datetime
from pathlib import Path
from typing import Any

from scanner import scan_directory


def app_base_dir() -> Path:
    """Return the app directory, handling PyInstaller bundles."""
    if getattr(sys, "frozen", False):
        return Path(sys.executable).parent
    return Path(__file__).parent


def bundle_base_dir() -> Path:
    """Return the read-only bundle directory for packaged frontend assets."""
    if getattr(sys, "frozen", False):
        return Path(sys._MEIPASS)  # type: ignore[attr-defined]
    return Path(__file__).parent


def snapshot_dir() -> Path:
    """Return the writable snapshot directory."""
    directory = app_base_dir() / "snapshots"
    directory.mkdir(exist_ok=True)
    return directory


def frontend_path() -> Path:
    """Return the frontend HTML path."""
    path = bundle_base_dir() / "index.html"
    if not path.exists():
        raise FileNotFoundError(f"index.html not found at {path}")
    return path


def sanitize_snapshot_name(name: str) -> str:
    safe = "".join(char if char.isalnum() or char in "-_" else "_" for char in name)
    return safe or f"snapshot-{int(datetime.now().timestamp())}"


def unique_snapshot_path(snapshot_id: str) -> tuple[str, Path]:
    directory = snapshot_dir()
    candidate_id = snapshot_id
    candidate_path = directory / f"{candidate_id}.json"
    suffix = 2

    while candidate_path.exists():
        candidate_id = f"{snapshot_id}_{suffix}"
        candidate_path = directory / f"{candidate_id}.json"
        suffix += 1

    return candidate_id, candidate_path


class Api:
    """Methods available in JavaScript as window.pywebview.api.*."""

    def choose_directory(self, initial_path: str = "") -> dict[str, Any]:
        directory = initial_path.strip().strip('"')
        if not os.path.isdir(directory):
            directory = str(Path.home())

        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        try:
            selected = filedialog.askdirectory(
                parent=root,
                initialdir=directory,
                title="Choose directory to scan",
                mustexist=True,
            )
        finally:
            root.destroy()

        if not selected:
            return {"cancelled": True}

        return {"path": selected}

    def scan(self, path: str, depth: int = 2) -> dict[str, Any]:
        scan_path = path.strip().strip('"')
        if not os.path.isdir(scan_path):
            return {"error": f"Directory not found: {scan_path}"}

        max_depth = max(1, min(int(depth), 5))
        started_at = datetime.now()
        scan_result = scan_directory(scan_path, max_depth)
        elapsed = (datetime.now() - started_at).total_seconds()

        return {
            "Path": scan_path,
            "Depth": max_depth,
            "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "Sizes": scan_result["dirs"],
            "Files": scan_result["files"],
            "Elapsed": f"{elapsed:.1f}s",
        }

    def get_snapshots(self) -> list[dict[str, Any]]:
        snapshots: list[dict[str, Any]] = []
        for path in sorted(snapshot_dir().glob("*.json"), reverse=True):
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
                data["_id"] = path.stem
                snapshots.append(data)
            except (OSError, json.JSONDecodeError):
                continue
        return snapshots

    def save_snapshot(self, name: str, data: dict[str, Any]) -> dict[str, Any]:
        snapshot_id = sanitize_snapshot_name(name)
        snapshot_id, path = unique_snapshot_path(snapshot_id)
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        return {"ok": True, "id": snapshot_id}

    def delete_snapshot(self, snap_id: str) -> dict[str, Any]:
        snapshot_id = sanitize_snapshot_name(snap_id)
        path = snapshot_dir() / f"{snapshot_id}.json"
        if path.exists():
            path.unlink()
            return {"ok": True}
        return {"error": "Not found"}
