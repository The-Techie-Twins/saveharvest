"use client";

import React, { useState } from "react";

interface PaymentCard {
  id: string;
  type: "VISA" | "AMEX";
  number: string;
  name: string;
  expiry: string;
  isDefault: boolean;
}

export function PaymentMethodsForm() {
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: "card-1",
      type: "VISA",
      number: "**** **** **** 4242",
      name: "Corp Purchasing",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "AMEX",
      number: "**** ****** *8193",
      name: "Exec Account",
      expiry: "08/25",
      isDefault: false,
    },
  ]);

  const handleAddCard = () => {
    alert("Add Card modal flow stub");
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-sm hover:border-primary/50 transition-all duration-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">credit_card</span>
            Payment Methods
          </h3>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Corporate cards and approved credit lines.
          </p>
        </div>
        <button
          onClick={handleAddCard}
          className="border border-outline hover:bg-surface-container-low text-on-surface px-4 py-2 rounded-lg font-body-sm text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cards */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative bg-surface p-5 rounded-lg border border-outline-variant hover:border-primary/50 transition-all group cursor-pointer overflow-hidden"
          >
            {/* Ambient card design asset */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-12 h-8 bg-surface-container-high rounded flex items-center justify-center text-xs font-bold text-on-surface-variant font-mono-data border border-outline-variant/30">
                {card.type}
              </div>
              {card.isDefault && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary-container/20 text-primary border border-primary/20 uppercase tracking-wider">
                  Default
                </span>
              )}
            </div>
            
            <div className="relative z-10">
              <div className="font-mono-data text-body-lg tracking-widest text-on-surface mb-2 font-semibold text-[15px]">
                {card.number}
              </div>
              <div className="flex justify-between text-on-surface-variant text-xs font-mono-data font-semibold">
                <span>{card.name}</span>
                <span>Exp {card.expiry}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Credit Line Status */}
        <div className="relative bg-surface p-5 rounded-lg border border-dashed border-outline-variant hover:border-primary/50 transition-colors group cursor-pointer flex flex-col justify-center items-center text-center">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center mb-3 text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
          <div className="font-semibold text-on-surface font-body-sm text-sm">Net-30 Credit Line</div>
          <div className="text-on-surface-variant text-xs mt-1">Application Pending Review</div>
        </div>
      </div>
    </section>
  );
}
