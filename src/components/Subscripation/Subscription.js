import React from 'react';
import { Link } from 'react-router-dom';
import './Subscription.css';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    features: [
      '1hr/day Playtime',
      'Access to limited games',
      'Standard quality streaming',
      'Advertisements included',
      'Basic support',
    ],
  },
  {
    name: 'Standard',
    price: '₹499',
    features: [
      '4hr/day Playtime',
      'Access to more games',
      'High-quality streaming',
      'No advertisements',
      'Priority support',
    ],
  },
  {
    name: 'Premium',
    price: '₹799',
    features: [
      '6hr/day Playtime',
      'Full game library access',
      'Ultra HD streaming',
      'No advertisements',
      'Exclusive in-game content',
    ],
  },
  {
    name: 'Ultimate',
    price: '₹1199',
    features: [
      'Unlimited Playtime',
      'All game library access',
      'Ultra HD streaming',
      'No advertisements',
      'Dedicated support',
      'Early access to new games',
    ],
  },
];

const Subscription = () => {
  const subscribe = (plan) => {
    alert(`You have selected the ${plan} plan!`);
    // Add further subscription handling logic here if needed
  };

  return (
    <div className="subscription">
      <header className="subscription-header">
        <h1>Choose Your Subscription Plan</h1>
        <p>Select a plan that suits your gaming needs!</p>
      </header>

      <section className="plans">
        {plans.map((plan, index) => (
          <div className="plan" key={index}>
            <h2>{plan.name}</h2>
            <p className="price">{plan.price}/month</p>
            <ul className="features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="subscribe-button" onClick={() => subscribe(plan.name)}>
              Choose {plan.name}
            </button>
          </div>
        ))}
      </section>

      <footer className="subscription-footer">
        <Link to="/" className="btn-back">Back to Home</Link>
      </footer>
    </div>
  );
};

export default Subscription;
