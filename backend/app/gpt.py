from langchain.chains import LLMChain
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
import requests

def BarAIMessage(selections):
    data = selections[-1]

    OPENAI_API_KEY="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"

    llm = OpenAI(temperature = 0.9, openai_api_key="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")

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
    x = requests.post('http://localhost:8000/output', json = outputs)
    print(x.text)
