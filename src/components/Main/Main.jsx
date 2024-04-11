import React, { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import client from '../ContentfulClient/Client';
import { News } from '../News/News';


export const Main = () => {

    return (
        <>
            <News></News>
        </>
    );
};