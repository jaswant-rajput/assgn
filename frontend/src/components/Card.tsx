import { Card as CardObject } from '../types/types';

const Card = ({ title, description }:CardObject) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
