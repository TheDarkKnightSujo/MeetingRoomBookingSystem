import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Book.css";
import axios from 'axios';

const Book = () => {
  
  return (
    <div className="BookContents">
        <div>Enter date: </div>
        <input type="date" />

    </div>
  );
};

export default Book;
