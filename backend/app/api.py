import logging
from fastapi import BackgroundTasks,FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import config
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain import OpenAI
from langchain.chains.conversation.memory import ConversationBufferMemory
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
import json


app = FastAPI()
key = config.open_ai_key

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "https://fitness-ai.netlify.app",
    "fitness-ai.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

outputs = []

def FitnessAI(selection):
    llm = ChatOpenAI(temperature = 0.9, model_name='gpt-3.5-turbo', openai_api_key=key)

    prompt= PromptTemplate(
        input_variables = ["age", "gender", "height","weight","days_per_week","experience", "goal", "id"],
        template = """
        Act as a professional fitness expert and trainer known as FitnessAI. Create a structured summary of an exercise plan specifically tailored for me. 
        I am a {gender}, {age} years old, {height} inches tall and {weight} pounds. I want to work out {days_per_week} days per week, and have {experience} experience 
        in the gym. My goal is {goal}. Do not include rest days, every day should contain exercises.

      Provide the workout plan in the below JSON structure:
        {{
          plan: {{
              goal: string,
              split: {{
                Day x {{
                  name: string, 
                  exercises: list 
                  }}
                }},
              tips: string,
              id: {id}
          }}
        }}

        Do not forget to include the id in the above json, it is the highest priority. For the exercises provide each exericse in the following form: Exercise Name: Sets x Reps
        """
    )

    promptTest = PromptTemplate(
      input_variables = ["test"],
      template = "What is a {test}?"
    )


    input = {"test":"test"}
    chain = LLMChain(llm=llm, prompt=prompt)
    out = chain.run(selection)
    data = {
        "body": out,
    }
    return data
  
@app.post("/") 
async def add(selection:dict) -> dict:
  print("RUNNING")
  print(selection)
  output = FitnessAI(selection)
  outputs.append(output)
  return {"data": "Output Added"}

@app.get("/")
def get() -> dict:
  return {"data": outputs}

@app.delete("/")
def clear():
  outputs.clear()
  return {"data": "Outputs Cleared"}

memory = ConversationBufferMemory(memory_key="chat_history",return_messages=True)
from pydantic import BaseModel

class ChatInput(BaseModel):
    question: str
@app.post("/chat")
async def chat_endpoint(input_data: ChatInput):
    question = input_data.question
    print(input)
    template = """You are an AI Bot that will work as a fitness coach. Your job is to help the /
    user learn about fitness and to give them advice based on their input, which may be a question. Your output can be either a question or a suggestion.
    {chat_history}
    Human: {question}
    AI: 
    """
    prompt_template = PromptTemplate(input_variables=["chat_history","question"], template=template)
    prompt_chain = LLMChain(
        llm=OpenAI(max_tokens = 1000, openai_api_key=key),
        prompt=prompt_template,
        verbose=True,
        memory = memory,
    )
    answer = prompt_chain.predict(question=question)
    return {"answer": answer}
