import React, {useState, useEffect, useContext} from 'react';
import {AiOutlineReload} from 'react-icons/ai';
import { v4 as uuid } from 'uuid';
import $ from "jquery";
import { OutputContext } from '../../../../context/OutputContext';
import axios from 'axios'
import GridLoader from "react-spinners/GridLoader";

const baseURL = process.env.REACT_APP_URL

const GenerateMenu =() => {
    const { setOutput } = useContext(OutputContext);  // get setOutput from OutputContext
    const [isLoading, setIsLoading] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);  // New state variable for timeout

    async function handlePost() {
      setIsLoading(true)
      setIsTimeout(false)
      const id = uuid()
      let timer = setTimeout(() => { // Set a timeout to update the 'isTimeout' state after 15 seconds
        setIsLoading(false);
        setIsTimeout(true);
      }, 1000); 
      try {
          await axios.post(baseURL, {
            age: $("#age").val(),
            gender: $("#gender").val(),
            height: $("#height").val(),
            weight: $("#weight").val(),
            days_per_week: $("#days_per_week :selected").text(),
            experience: $("#experience :selected").text(),
            goal: $("#goal").val(),
            id: id
          });
          const output = await fetchOutputs(id);
          clearTimeout(timer); // clear the timer if the fetching output is successful
          console.log(output);
          setOutput(output)
          setIsLoading(false)
      } catch (error) {
          console.log(error);
          clearTimeout(timer); // clear the timer if there's an error
      }
  }

    async function fetchOutputs (id) {  // Take id as a parameter
      let outputData;
      while (!outputData) {
        try {
          const response = await axios.get(baseURL);
          // Find the element with the same id
          for (let item of response.data.data) {
            let body = JSON.parse(item.body);
            console.log(body.plan.id)
            if (body.plan.id === id) {
              outputData = body;
              break;
            }
          }
          if (!outputData) {
            // If not found, wait for a moment before trying again
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (error) {
          console.log(error);
          // In case of error, wait for a moment before trying again
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      return outputData;  // Return the data
    }

    return (
      <div className = "generate">
      {isLoading ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 9999,
        }}>
          <div>
          <GridLoader />
        </div>
        <p> Generating Workout </p>
        </div>
      ) : isTimeout ? (
          <div className="timeout-message"  style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 9999}}
            >
            Timed out. Please reload the page.</div>
      ) : <div> </div>}
      <button type="button" className="btn btn-success" onClick={handlePost} disabled = {isLoading} id="Generate">
        Generate <AiOutlineReload />
      </button>
    </div>
    )
}

export default GenerateMenu
