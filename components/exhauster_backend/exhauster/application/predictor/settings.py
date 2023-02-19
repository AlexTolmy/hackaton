from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    VIBRATION_SENSITIVITY: float = 0.3
    ROLLING_WINDOW_MINUTES: int = 300
    RESAMPLE_WINDOW_MINUTES: int = 60
    WARNING_VIBRATION_SENSITIVITY: float = 1.0
