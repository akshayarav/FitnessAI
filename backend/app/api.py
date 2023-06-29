from fastapi import BackgroundTasks,FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from .gpt import BarAIMessage

if "OPENAI_API_KEY" not in os.environ:
    os.environ["OPENAI_API_KEY"] = "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"

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

outputs = [
  {
  "id": 1,
  "body": ""
 },
]


selections = []
  
@app.post("/menu", tags=["menu"])
async def add_post(selection:dict, background_tasks: BackgroundTasks) -> dict:
  selections.append(selection)
  background_tasks.add_task(BarAIMessage, selections)
  return {"data": {"Output added"}}

@app.get("/menu", tags=["menu"])
async def get_menu() -> dict:
    return {"data": selections}

@app.get("/output", tags=["outputs"])
async def get_output() -> dict:
    return {"data": outputs}

@app.post("/output", tags=["outputs"])
async def add_output(output: dict) -> dict:
  outputs.append(output)
  return {
    "data": {"Output added"}
  }


