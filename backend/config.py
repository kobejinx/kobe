"""后端运行配置。真实配置放在 backend/.env 中。"""

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")


def _read_origins() -> tuple[str, ...]:
    value = os.getenv("FRONTEND_ORIGINS", "")
    return tuple(origin.strip() for origin in value.split(",") if origin.strip())


@dataclass(frozen=True)
class Settings:
    host: str = os.getenv("API_HOST", "")
    port: int = int(os.getenv("API_PORT", "8000"))
    reload: bool = os.getenv("API_RELOAD", "false").lower() == "true"
    frontend_origins: tuple[str, ...] = _read_origins()
    public_url: str = os.getenv("API_PUBLIC_URL", "")


settings = Settings()
