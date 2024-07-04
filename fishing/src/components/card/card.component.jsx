import React from 'react';
import Card from "react-bootstrap/Card";

const CardComponent = ({nFish}) => {
    return (
        <div>
            <Card.Title>{nFish.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{nFish.wed} kg</Card.Subtitle>
            <Card.Text>
                {nFish.price} $
            </Card.Text>
        </div>
    );
};

export default CardComponent;