from fastapi import BackgroundTasks,FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from .gpt import BarAIMessage
import requests

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "https://fitness-ai.netlify.app/",
    "fitness-ai.netlify.app/"
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
  BarAIMessage(selections)
  requests.post('https://fitaibackend-1-m9779176.deta.app/output', json = selections)
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


