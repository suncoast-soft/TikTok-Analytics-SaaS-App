'use client'

import ProfileForm from '@/components/modules/AccountForms/ProfileForm'
import SubscriptionForm from '@/components/modules/AccountForms/SubscriptionForm'
import StripePricingTable from '@/components/stripe/StripeTable'
import React, { useState } from 'react'

const Onboarding = () => {
  const [step, setStep] = useState(1)

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Customer Onboarding
      </h2>
      <div className="mb-4 flex justify-around">
        <button
          disabled={step === 1}
          onClick={prevStep}
          className={`px-4 py-2 rounded-full ${step === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          Back
        </button>
        <button
          disabled={step === 3}
          onClick={nextStep}
          className={`px-4 py-2 rounded-full ${step === 3 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          Next
        </button>
      </div>
      <div className="p-4 mb-6 border-t border-b transition-all duration-500">
        {step === 1 && <ProfileForm />}
        {step === 2 && <SubscriptionForm />}
        {step === 3 && <StripePricingTable />}
      </div>
      <div className="text-center text-sm mt-4 text-gray-500">
        Step {step} of 3
      </div>
    </div>
  )
}

export default Onboarding
