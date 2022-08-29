import React from 'react'
import "./NotesCard.css"

export default function NotesCard(props) {
    return (
        <article className='card'>
            <h2>{props.title}</h2>
            <span>{props.date}</span>
            <p>{props.body}</p>
            <button onClick={
                (event) =>{
                    props.deleteNote(event)
                }
            } className='red button-card' id={props.idx}>Delete</button>
            <button onClick={
                (event) =>{
                    props.arsipNote(event)
                }
            } className='green button-card' id={props.idx}>{props.isArsip ? "Pindahkan" : "Arsipkan"}</button>
        </article>
    )
}