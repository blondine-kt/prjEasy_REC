import React from 'react';
import '../assets/styles/Abonement.css'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const SubscriptionPlansRec = () => {
    const plans = [
        {
          name: 'Basic',
          price: 19,
          description: 'Pour les recruteurs qui souhaitent simplifier leur processus de sélection',
          features: [
            'Liste de candidats présélectionnés',
            'Filtrage selon les critères de base',
            'Correspondance automatique avec vos offres',
            'Export des profils en PDF'
          ],
          variant: 'basic'
        },
        {
          name: 'Pro',
          price: 49,
          description: 'Pour les candidats qui veulent maximiser leurs chances',
          features: [
            'Génération de lettres de motivation en un clic',
            'Adaptation automatique selon l\'offre',
            'Suggestions personnalisées',
            'Suivi des candidatures'
          ],
          variant: 'pro'
        },
        {
          name: 'Enterprise',
          price: 99,
          description: 'Solution complète pour recruteurs et candidats',
          features: [
            'Chatbot IA pour le filtrage des candidats',
            'Conseils d\'amélioration des CVs',
            'Analyses détaillées des profils',
            'Support dédié 7j/7'
          ],
          variant: 'enterprise'
        }
      ];
    
    
      const createOrder = (price) => async (data, actions) => {
        try {
          return await actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price.toString(),
                  currency_code: "USD"
                },
                description: `Subscription Plan - ${price}$/month`
              }
            ],
          });
        } catch (error) {
          console.error('PayPal order creation failed:', error);
          throw error;
        }
      };
    
      const onApprove = async (data, actions) => {
        try {
          const details = await actions.order.capture();
          console.log('Payment successful:', details);
          alert(`Transaction completed by ${details.payer.name.given_name}`);
          // Here you would handle the successful payment
        } catch (error) {
          console.error('Payment failed:', error);
          alert('There was an error processing your payment');
        }
      };
    
      const onError = (err) => {
        console.error('PayPal error:', err);
        alert('There was an error loading PayPal');
      };
    
      return (
        
          <div className="subscription-container">
            {plans.map((plan) => (
              <div key={plan.name} className={`subscription-card subscription-card--${plan.variant}`}>
                <h3 className={`subscription-title subscription-title--${plan.variant}`}>
                  {plan.name}
                </h3>
                <p className="subscription-price">{plan.price}$/mois</p>
                <p className="subscription-description">{plan.description}</p>
                <ul className="subscription-features">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="subscription-feature-item">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <PayPalButtons 
                  createOrder={createOrder(plan.price)}
                  onApprove={onApprove}
                  onError={onError}
                  style={{
                    layout: "horizontal",
                    color: "blue",
                    shape: "rect",
                    label: "subscribe"
                  }}
                />
              </div>
            ))}
          </div>
        
      );
    };
    

export default SubscriptionPlansRec;