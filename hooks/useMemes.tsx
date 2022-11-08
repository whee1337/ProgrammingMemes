import axios from "axios";
import { Meme } from "../models/Meme";

const options = {
    method: 'GET',
    url: 'https://programming-memes-reddit.p.rapidapi.com/',
    headers: {
      'X-RapidAPI-Key': 'a370b99373mshb802b06d43b3c0ap14af3cjsn583a839d3dd4',
      'X-RapidAPI-Host': 'programming-memes-reddit.p.rapidapi.com'
    }
  };

export default function memes()
{
    return axios.request<Meme[]>(options);
}