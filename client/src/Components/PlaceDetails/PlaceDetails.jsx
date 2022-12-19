import React from 'react'

const PlaceDetails = ({place}) => {
  console.log(place);
  return (
    <h3>{place.name}</h3>
  )
}

export default PlaceDetails