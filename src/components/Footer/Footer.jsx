import React, { useState, useEffect } from 'react';
import styles from './Footer.module.scss';
import client from '../ContentfulClient/Client';

export const Footer = () => {




    return (
        <footer>
            <section>
                <article>
                    <ul><h3>LinkSection</h3>
                        <li>Full of Links</li>
                        <li>Different kinds of Links</li>
                        <li>Links</li>
                    </ul>
                </article>
                <article>
                    <ul><h3>LinkSection</h3>
                        <li>Full of Links</li>
                        <li>Different kinds of Links</li>
                        <li>Links</li>
                    </ul>
                </article><article>
                    <ul><h3>LinkSection</h3>
                        <li>Full of Links</li>
                        <li>Different kinds of Links</li>
                        <li>Links</li>
                    </ul>
                </article><article>
                    <ul><h3>LinkSection</h3>
                        <li>Full of Links</li>
                        <li>Different kinds of Links</li>
                        <li>Links</li>
                    </ul>
                </article>
            </section>
        </footer>
    );
};
