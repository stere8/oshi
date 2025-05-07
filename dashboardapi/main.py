print("🚀 FastAPI is loading from main.py")


from fastapi import FastAPI,Request,Response




from database import Base, engine
from routers import lesson, sublesson  # import routers
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)  # 🔧 This creates the DB tables

origins = [
    "*"
]
app = FastAPI()
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/debug-cors")
def debug_cors(request: Request):
    print("Origsin:", request.headers.get("origin"))
    return {"message": "cors works"}


app.include_router(lesson.router)
app.include_router(sublesson.router)



