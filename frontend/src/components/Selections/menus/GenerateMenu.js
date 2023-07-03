import React from 'react';
import {AiOutlineReload} from 'react-icons/ai';
import axios from 'axios'
import $ from "jquery"


const baseURL = process.env.REACT_APP_URL

const GenerateMenu =() => {
    function Post() {
      axios.post(baseURL, {
        age: $("#age").val(),
        gender: $("#gender").val(),
        height: $("#height").val(),
        weight: $("#weight").val(),
        days_per_week: $("#days_per_week :selected").text(),
        experience: $("#experience :selected").text(),
        goal: $("#goal").val()
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
        <button type="button" className="btn btn-success" onClick={Post} id="Generate">
            Generate <AiOutlineReload />
        </button>
    )
}

export default GenerateMenu