"""Directory scanning helpers for Disk Analyzer."""

from __future__ import annotations

import os
from typing import TypedDict


class ScanResult(TypedDict):
    dirs: dict[str, int]
    files: dict[str, int]


def scan_directory(root: str, max_depth: int) -> ScanResult:
    """Return directory and file size maps keyed by relative path."""
    sizes: dict[str, int] = {}
    files: dict[str, int] = {}
    root = os.path.abspath(root)

    def relative(path: str) -> str:
        rel = os.path.relpath(path, root)
        return rel if rel != "." else "."

    def directory_size(path: str) -> int:
        total = 0
        try:
            with os.scandir(path) as entries:
                for entry in entries:
                    try:
                        if entry.is_file(follow_symlinks=False):
                            size = entry.stat(follow_symlinks=False).st_size
                            files[relative(entry.path)] = size
                            total += size
                        elif entry.is_dir(follow_symlinks=False):
                            child_total = directory_size(entry.path)
                            sizes[relative(entry.path)] = child_total
                            total += child_total
                    except (OSError, PermissionError):
                        continue
        except (OSError, PermissionError):
            return 0
        return total

    def walk(path: str, depth: int) -> int:
        total = 0
        child_dirs: list[str] = []

        try:
            with os.scandir(path) as entries:
                for entry in entries:
                    try:
                        if entry.is_file(follow_symlinks=False):
                            size = entry.stat(follow_symlinks=False).st_size
                            files[relative(entry.path)] = size
                            total += size
                        elif entry.is_dir(follow_symlinks=False):
                            child_dirs.append(entry.path)
                    except (OSError, PermissionError):
                        continue
        except (OSError, PermissionError):
            return 0

        for child_dir in child_dirs:
            if depth < max_depth:
                total += walk(child_dir, depth + 1)
            else:
                total += directory_size(child_dir)

        sizes[relative(path)] = total
        return total

    walk(root, 0)
    return {"dirs": sizes, "files": files}
