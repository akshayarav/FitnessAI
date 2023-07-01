import React from 'react';
import {AiOutlineReload} from 'react-icons/ai';
import axios from '../../../services/instance'
import $ from "jquery"



const GenerateMenu =() => {
    function Post() {
      axios.post('menu', {
        liquor: $("#liquor :selected").text(),
        mixer: $("#mixer").val(),
        percentage: $("#percentage").val(),
        servings: $("#servings").val(),
        difficulty: $("#difficulty :selected").text(),
        holiday: $("#holiday :selected").text()
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