"""Vercel serverless entrypoint.

Vercel's Python runtime imports this file and looks for an ASGI-compatible
`app` object. The actual application lives in server/app/main.py so that
`uvicorn app.main:app` (documented in the README for local dev) keeps
working completely unchanged — this module just makes that same app
importable from the path Vercel expects (api/index.py), by adding
`server/` to sys.path before importing it.
"""

import sys
from pathlib import Path

_SERVER_DIR = Path(__file__).resolve().parent.parent / "server"
if str(_SERVER_DIR) not in sys.path:
    sys.path.insert(0, str(_SERVER_DIR))

from app.main import app  # noqa: E402  (import must follow the sys.path fix above)

__all__ = ["app"]
