import React,{useContext} from 'react';
import '../assets/styles/Abonement.css'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useAuth } from '../context/userAuth';
import Api from '../context/Apicontext';

const SubscriptionPlans = () => {

  const{ user } = useAuth()
  const { SOURCE } = useContext(Api)

  const handleAbonnement = async(name) =>{
    try{
      const dataTosend={
        forfait:name,
        recruteur_id:String(user.candidateId)
      }
    
      const response = await fetch(`${SOURCE}/abonnement_candidats`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body:JSON.stringify(dataTosend),
      });
      const data = await response.json();
      if(data){
        console.log("reponse:", data);
        
      }
      
    } catch (error) {
      console.log(error);
    }
  }


    const plans = [
        {
          name: 'Basic',
          price: 19,
          description: "Pour commencer votre recherche d'emploi",
          features: [
            'Outil de correspondance automatique',
            'Suggestions basiques',
            'Support par email'
          ],
          variant: 'basic'
        },
        {
          name: 'Pro',
          price: 49,
          description: "Pour les chercheurs d'emploi sérieux",
          features: [
            'Tout du plan Basic',
            'Lettres de motivation personnalisées',
            'Support prioritaire'
          ],
          variant: 'pro'
        },
        {
          name: 'Enterprise',
          price: 99,
          description: 'Pour les entreprises qui recrutent',
          features: [
            'Tout du plan Pro',
            'Chatbot IA intégré',
            "Rapports d'analyse avancée"
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
    
      const onApprove  = (name) => async (data, actions) => {
        try {
          const details = await actions.order.capture();
          console.log('Payment successful:', details);
          alert(`Transaction completed by ${details.payer.name.given_name}`);
          // Here you would handle the successful payment
          handleAbonnement(name)
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
                  onApprove={onApprove(plan.name)}
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
    

export default SubscriptionPlans;