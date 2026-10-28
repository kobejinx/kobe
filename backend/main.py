from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn
from config import settings


app = FastAPI(title="Kobe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.frontend_origins),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


profile = {
    "heroTitle": "我是神",
    "heroSubtitle": "项目，创意，灵感，心得，我的作品",
}


class SentimentRequest(BaseModel):
    text: str = Field(min_length=1, max_length=2000)


class SentimentResponse(BaseModel):
    score: float = Field(ge=-1, le=1)
    label: Literal["积极", "中性", "消极"]
    positive_count: int
    negative_count: int


POSITIVE_WORDS = (
    "开心",
    "高兴",
    "喜欢",
    "优秀",
    "成功",
    "满意",
    "惊喜",
    "幸福",
    "棒",
    "好",
)

NEGATIVE_WORDS = (
    "难过",
    "生气",
    "讨厌",
    "失败",
    "糟糕",
    "失望",
    "痛苦",
    "焦虑",
    "坏",
    "差",
)


def calculate_sentiment(text: str) -> SentimentResponse:
    positive_count = sum(text.count(word) for word in POSITIVE_WORDS)
    negative_count = sum(text.count(word) for word in NEGATIVE_WORDS)
    raw_score = positive_count - negative_count
    score = round(max(-1, min(1, raw_score / 3)), 2)

    if score > 0.2:
        label = "积极"
    elif score < -0.2:
        label = "消极"
    else:
        label = "中性"

    return SentimentResponse(
        score=score,
        label=label,
        positive_count=positive_count,
        negative_count=negative_count,
    )


@app.get("/api/profile")
def get_profile():
    return profile


@app.post("/api/sentiment", response_model=SentimentResponse)
def analyze_sentiment(request: SentimentRequest):
    return calculate_sentiment(request.text)


if __name__ == "__main__":
    print(f"后端已启动，监听端口：{settings.port}")
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
    )