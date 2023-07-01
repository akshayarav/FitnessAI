from langchain.chains import LLMChain
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
import requests
import os
import config

OPENAI_KEY = config.OPENAIKEY

def BarAIMessage(selection):
    data = selection

    llm = OpenAI(temperature = 0.9, openai_api_key=OPENAI_KEY)

    prompt = PromptTemplate(
        input_variables = ["liquor", "mixer","percentage","servings","difficulty","holiday"],
        template = "What is a cocktail recipe containing {liquor} and using the mixer {mixer}. \
            It should have an alcohol percentage of about {percentage} and serve {servings} people. \
            The difficulty should be {difficulty} and be {holiday} themed? \
            Include the alcohol percentage, serving number, and difficulty at the top of the output in its own section"
    )



    input = data
    chain = LLMChain(llm=llm, prompt=prompt)
    output = chain.run(input)
    print(output)
    outputs = {
        "id": len(selections)+1,
        "body": output,
    }
    x = requests.post('https://fitaibackend-1-m9779176.deta.app/output', json = outputs)
    print(x.text)

# test = {"liquor":"Vodka","mixer":"TEST","percentage":"","servings":"","difficulty":"Any","holiday":"Any"}
# y = requests.post('https://fitaibackend-1-m9779176.deta.app/menu', json=test)
# print(y.text)