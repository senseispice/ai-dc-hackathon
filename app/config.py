"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # LLM
    llm_provider: str = "gemini"  # "anthropic", "openai", or "gemini"
    llm_model: str = "gemini-flash-latest"
    anthropic_api_key: str = ""
    openai_api_key: str = ""
    gemini_api_key: str = ""

    # CrustData
    crustdata_api_key: str = ""
    crustdata_mock: bool = True  # True = use mock data (no API calls)

    # ChromaDB
    chroma_persist_dir: str = "./chroma_db"

    # App
    log_level: str = "INFO"

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
