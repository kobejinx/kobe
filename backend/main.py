from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


app = FastAPI(title="Kobe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
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
    print("后端已启动：http://localhost:8000/api/profile")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
