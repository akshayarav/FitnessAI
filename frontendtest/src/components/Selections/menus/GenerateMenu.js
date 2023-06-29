import React from 'react';
import {AiOutlineReload} from 'react-icons/ai';
import axios from 'axios'
import $ from "jquery"
import Output from './output'



const GenerateMenu =() => {
    function Post() {
      axios.post('http://localhost:8000/menu', {
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

      document.getElementById("Generate").disabled = true;
      
      const cached_length = 0
      axios.get('http://localhost:8000/output', {
      })
      .then(function (response) {
        console.log(response['data']['data'].length)
        cached_length = response['data']['data'].length
      })
      .catch(function (error) {
        console.log(error);
      });
      const toggle = true;
      // while (toggle) {
      //   axios.get('http://localhost:8000/output', {
      //   })
      //   .then(function (response) {
      //     console.log(response['data']['data'].length)
      //     if (response['data']['data'].length!=cached_length){
      //       toggle = false
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // }
      document.getElementById("Generate").disabled = false;
    }

    return (
        <button type="button" className="btn btn-success" onClick={Post} id="Generate">
            Generate <AiOutlineReload />
        </button>
    )
}

export default GenerateMenu