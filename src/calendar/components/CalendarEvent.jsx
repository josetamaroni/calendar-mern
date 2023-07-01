import React from 'react'

export const CalendarEvent = ({ event }) => {
    const { title, use } = event;
    return (
        <>
            <strong>{ title }</strong>
            <span> - { use.name }</span>
        </>
    )
}