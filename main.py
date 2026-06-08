"""Disk Analyzer application entry point."""

from __future__ import annotations

import webview

from api import Api, frontend_path


APP_TITLE = "Disk Analyzer"
WINDOW_SIZE = (1280, 820)
MIN_WINDOW_SIZE = (900, 600)


def main() -> None:
    webview.create_window(
        APP_TITLE,
        url=str(frontend_path()),
        js_api=Api(),
        width=WINDOW_SIZE[0],
        height=WINDOW_SIZE[1],
        min_size=MIN_WINDOW_SIZE,
    )
    webview.start(debug=False)


if __name__ == "__main__":
    main()
