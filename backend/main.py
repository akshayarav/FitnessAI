from fastapi import BackgroundTasks,FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import config
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate


#ISSUE with FitnessAI Function, seems to be a problem with deta and openAI, try switching to Vercel if problem persists

app = FastAPI()
key = config.open_ai_key

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "https://fitness-ai.netlify.app",
    "fitness-ai.netlify.api"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

outputs = [
]

def FitnessAI(selection):
    llm = ChatOpenAI(temperature = 0.9, model_name='gpt-3.5-turbo', openai_api_key=key)

    prompt= PromptTemplate(
        input_variables = ["liquor", "mixer","percentage","servings","difficulty","holiday"],
        template = "What is a cocktail recipe containing {liquor} and using the mixer {mixer}. \
            It should have an alcohol percentage of about {percentage} and serve {servings} people. \
            The difficulty should be {difficulty} and be {holiday} themed? \
            Include the alcohol percentage, serving number, and difficulty at the top of the output in its own section"
    )

    promptTest = PromptTemplate(
      input_variables = ["test"],
      template = "What is a {test}?"
    )


    input = {"test":"test"}
    chain = LLMChain(llm=llm, prompt=promptTest)
    out = chain.run(input)
    data = {
        "body": out,
    }
    return data
  
@app.post("/") 
async def add(selection:dict, background_tasks: BackgroundTasks) -> dict:
  # background_tasks.add_task(FitnessAI, selection)
  output = FitnessAI(selection)
  outputs.append(output)
  return {"data": "Output Added"}

@app.get("/")
def get() -> dict:
  return {"data": outputs}

# FitnessAI({"test":"test"})
# print(outputs)
