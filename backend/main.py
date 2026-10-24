from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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


@app.get("/api/profile")
def get_profile():
    return profile


if __name__ == "__main__":
    if settings.public_url:
        print(f"后端已启动：{settings.public_url}/api/profile")
    else:
        print(f"后端已启动，监听端口：{settings.port}")
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
    )
